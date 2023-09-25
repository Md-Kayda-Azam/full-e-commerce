import { generateRandomPassword } from "../../../helpers/helpers";
import ModalPopup from "../../ModalPopup/ModalPopup";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import useFormFrilds from "../../../hooks/inputFeildsForm";
import { createUser } from "../../../features/user/userApiSlice";

const CreateUser = ({ show }) => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.user);

  const [input, handleInputChange, resetForm, setInput] = useFormFrilds({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  // handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(input));
    resetForm();
  };
  // handle Random Password Generator
  const handleRandomPasswordGenerator = (e) => {
    e.preventDefault();
    const rd_password = generateRandomPassword();

    setInput((prev) => ({
      ...prev,
      password: rd_password,
    }));
  };
  return (
    <ModalPopup target={show} title="Add new User">
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={input.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-3">
          <label htmlFor="">Email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={input.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-3">
          <label htmlFor="">Password</label>
          <input
            type="text"
            className="form-control"
            name="password"
            value={input.password}
            onChange={handleInputChange}
          />
          <a
            className="badge badge-info text-light"
            onClick={handleRandomPasswordGenerator}
            style={{ cursor: "pointer" }}
          >
            Random password
          </a>
        </div>
        <div className="my-3">
          <label htmlFor="">Roles</label>
          <select
            name="role"
            id=""
            className="form-control"
            value={input.role}
            onChange={handleInputChange}
          >
            <option value="">--Select--</option>
            {role?.map((data, index) => {
              return (
                <option value={data._id} key={index}>
                  {data.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="my-3">
          <button type="submit" className="btn btn-primary w-100">
            Create new User
          </button>
        </div>
      </form>
    </ModalPopup>
  );
};
CreateUser.propTypes = {
  show: PropTypes.any, // You can replace `any` with the actual prop type
};
export default CreateUser;
