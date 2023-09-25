import { useDispatch, useSelector } from "react-redux";
import { updatedTag } from "../../../features/product/productApiSlice";
import ModalPopup from "../../ModalPopup/ModalPopup";
import useFormFrilds from "../../../hooks/inputFeildsForm";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { filterById } from "../../../utils/tools";

const UpdateTag = ({ show, idEdit }) => {
  const dispatch = useDispatch();
  const { tag, loader } = useSelector((state) => state.product);

  const [input, handleInputChange, resetForm, setInput] = useFormFrilds({
    name: "",
  });

  // handle tag data updated
  const handleCreateTag = (e) => {
    e.preventDefault();
    dispatch(updatedTag({ name: input.name, id: idEdit }));

    resetForm();
  };
  // filter id data for updated tag
  useEffect(() => {
    filterById(tag, idEdit, setInput);
  }, [tag, idEdit, setInput]);

  return (
    <ModalPopup target={show} title="Add new tag">
      <form onSubmit={handleCreateTag}>
        <div className="my-3">
          <label htmlFor="">Tag Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={input?.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="my-3">
          <button className="btn btn-primary btn-block" type="submit">
            {loader ? "Tag data creating....." : "Update Tag"}
          </button>
        </div>
      </form>
    </ModalPopup>
  );
};
UpdateTag.propTypes = {
  show: PropTypes.any, // You can replace `any` with the actual prop type
  idEdit: PropTypes.any, // You can replace `any` with the actual prop type
};
export default UpdateTag;
