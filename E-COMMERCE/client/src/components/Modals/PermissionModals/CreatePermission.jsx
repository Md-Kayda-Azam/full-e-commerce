import { useDispatch } from "react-redux";
import { createPermission } from "../../../features/user/userApiSlice";
import ModalPopup from "../../ModalPopup/ModalPopup";
import useFormFrilds from "../../../hooks/inputFeildsForm";
import PropTypes from "prop-types";

const CreatePermission = ({ show }) => {
  const dispatch = useDispatch();

  const [input, handleInputChange, resetForm] = useFormFrilds({
    name: "",
  });
  // hamdle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(createPermission(input));

    resetForm({
      name: "",
    });
  };

  return (
    <ModalPopup target={show} title="Add new permission">
      <form onSubmit={handleFormSubmit}>
        <div className="my-3">
          <label htmlFor="">Permission Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={input.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-3">
          <button className="btn btn-primary btn-block" type="submit">
            Add new permission
          </button>
        </div>
      </form>
    </ModalPopup>
  );
};
CreatePermission.propTypes = {
  show: PropTypes.any, // You can replace `any` with the actual prop type
};
export default CreatePermission;
