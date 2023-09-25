import { useDispatch, useSelector } from "react-redux";
import { createRole } from "../../../features/user/userApiSlice";
import ModalPopup from "../../ModalPopup/ModalPopup";
import { getAllPermissionData } from "../../../features/user/userSlice";
import useFormFrilds from "../../../hooks/inputFeildsForm";
import { useState } from "react";
import PropTypes from "prop-types";

const CreateRole = ({ show }) => {
  const dispatch = useDispatch();

  const { permission } = useSelector(getAllPermissionData);

  const [input, handleInputChange, resetForm] = useFormFrilds({
    name: "",
  });

  const [selected, setSelected] = useState([]);

  // handle submit form
  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(
      createRole({
        name: input.name,
        permissions: [...selected],
      })
    );
    resetForm({
      name: "",
    });
    setSelected([]);
  };

  const handleCheckBoxChange = (e) => {
    const val = e.target.value;
    const updat3eList = [...selected];
    if (selected.includes(val)) {
      updat3eList.splice(selected.indexOf(val), 1);
    } else {
      updat3eList.push(val);
    }
    setSelected(updat3eList);
  };
  return (
    <ModalPopup target={show} title="Add new role">
      <form onSubmit={handleSubmitForm}>
        <div className="my-3">
          <label htmlFor="">Role Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={input.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-3">
          <label htmlFor="">Permissions</label>
          {permission?.map((item, index) => {
            return (
              <label className="d-block" key={index}>
                <input
                  type="checkbox"
                  value={item.name}
                  checked={selected.includes(item.name)}
                  onChange={handleCheckBoxChange}
                />{" "}
                {item.name}
              </label>
            );
          })}
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
CreateRole.propTypes = {
  show: PropTypes.any,
};

export default CreateRole;
