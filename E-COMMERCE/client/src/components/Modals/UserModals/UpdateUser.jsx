import { generateRandomPassword } from "../../../helpers/helpers";
import ModalPopup from "../../ModalPopup/ModalPopup";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import useFormFrilds from "../../../hooks/inputFeildsForm";
import { useEffect } from "react";
import { filterById } from "../../../utils/tools";
import { updateUser } from "../../../features/user/userApiSlice";

const UpdateUser = ({ show, idEdit }) => {
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.user);

  const [input, handleInputChange, resetForm, setInput] = useFormFrilds({
    name: "",
    email: "",
    passwordu: "",
    role: "",
  });
  // handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(input));
    resetForm();
  };

  // filter id data for updated tag
  useEffect(() => {
    filterById(user, idEdit, setInput);
  }, [user, idEdit, setInput]);

  // handle Random Password Generator
  const handleRandomPasswordGenerator = (e) => {
    e.preventDefault();
    const rd_password = generateRandomPassword();

    setInput((prev) => ({
      ...prev,
      passwordu: rd_password,
    }));
  };
  return (
    <ModalPopup target={show} title="Updated User">
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={input?.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-3">
          <label htmlFor="">Email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={input?.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-3">
          <label htmlFor="">Password</label>
          <input
            type="text"
            className="form-control"
            name="passwordu"
            value={input?.passwordu}
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
            value={input?.role}
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
            Update User
          </button>
        </div>
      </form>
    </ModalPopup>
  );
};
UpdateUser.propTypes = {
  show: PropTypes.any, // You can replace `any` with the actual prop type
  idEdit: PropTypes.any, // You can replace `any` with the actual prop type
};
export default UpdateUser;
