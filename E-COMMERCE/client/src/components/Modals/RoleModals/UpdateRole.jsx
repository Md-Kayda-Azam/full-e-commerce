import { useDispatch, useSelector } from "react-redux";
import ModalPopup from "../../ModalPopup/ModalPopup";
import { getAllPermissionData } from "../../../features/user/userSlice";
import useFormFrilds from "../../../hooks/inputFeildsForm";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { filterById } from "../../../utils/tools";
import { updateRole } from "../../../features/user/userApiSlice";

const UpdateRole = ({ show, idEdit }) => {
  const dispatch = useDispatch();

  const { role, permission } = useSelector(getAllPermissionData);

  const [input, handleInputChange, resetForm, setInput] = useFormFrilds({
    name: "",
  });

  const [selected, setSelected] = useState([]);

  //handleRoleUpdateSubmitForm
  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(
      updateRole({
        id: input._id,
        name: input.name,
        permissions: selected,
      })
    );
    resetForm();
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

  // filter id data for updated tag
  useEffect(() => {
    filterById(role, idEdit, setInput, setSelected);
  }, [role, idEdit, setInput]);

  return (
    <ModalPopup target={show} title="Update role">
      <form onSubmit={handleSubmitForm}>
        <div className="my-3">
          <label htmlFor="">Role Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={input?.name}
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
                  checked={selected?.includes(item.name)}
                  onChange={handleCheckBoxChange}
                />{" "}
                {item.name}
              </label>
            );
          })}
        </div>
        <div className="my-3">
          <button className="btn btn-primary btn-block" type="submit">
            Update role
          </button>
        </div>
      </form>
    </ModalPopup>
  );
};
UpdateRole.propTypes = {
  show: PropTypes.any,
  idEdit: PropTypes.any,
};

export default UpdateRole;
