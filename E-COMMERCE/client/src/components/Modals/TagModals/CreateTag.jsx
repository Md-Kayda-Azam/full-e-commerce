import { useDispatch, useSelector } from "react-redux";
import { createTag } from "../../../features/product/productApiSlice";
import ModalPopup from "../../ModalPopup/ModalPopup";
import useFormFrilds from "../../../hooks/inputFeildsForm";
import PropTypes from "prop-types";

const CreateTag = ({ show }) => {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.product);

  const [input, handleInputChange, resetForm] = useFormFrilds({
    name: "",
  });

  // handle tag data create
  const handleCreateTag = (e) => {
    e.preventDefault();
    dispatch(createTag({ name: input.name }));
    resetForm();
  };

  return (
    <ModalPopup target={show} title="Add new tag">
      <form onSubmit={handleCreateTag}>
        <div className="my-3">
          <label htmlFor="">Tag Name</label>
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
            {loader ? "Brand data creating....." : "Add new Tag"}
          </button>
        </div>
      </form>
    </ModalPopup>
  );
};
CreateTag.propTypes = {
  show: PropTypes.any, // You can replace `any` with the actual prop type
};
export default CreateTag;
