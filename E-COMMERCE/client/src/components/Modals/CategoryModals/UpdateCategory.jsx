import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import useFormFrilds from "../../../hooks/inputFeildsForm";
import ModalPopup from "../../ModalPopup/ModalPopup";
import { filterById, photoChange } from "../../../utils/tools";
import { updatedProductCategory } from "../../../features/product/productApiSlice";

const UpdateCategory = ({ idEdit, modal }) => {
  const dispatch = useDispatch();

  const { category, loader } = useSelector((state) => state.product);

  const [input, handleInputChange, resetForm, setInput] = useFormFrilds({
    name: "",
    icon: "",
    parent: "",
    parentCategory : "",
    logo: null,
    photo: null,
  });


  // handle OnChange Photo
  const handleOnChangePhoto = (e) => {
    photoChange(setInput, e);
  };

  // updated category data submit handle
  const handleUpdateCategory = (e) => {
    e.preventDefault();

    const form_data = new FormData();

    form_data.append("name", input.name);
    form_data.append("icon", input.icon);
    form_data.append("parentCategory", input.parent);
    form_data.append("catPhoto", input.logo);

    dispatch(updatedProductCategory({ data: form_data, id: input._id }));

    resetForm();
  };

  // filter id data for updated category
  useEffect(() => {
    filterById(category, idEdit, setInput);
  }, [category, idEdit, setInput]);

  return (
    <div>
      <ModalPopup target={modal} title="Add new category">
        <form onSubmit={handleUpdateCategory}>
          <div className="my-3">
            <label htmlFor="">Category Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={input?.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="">Category Icon</label>
            <input
              type="text"
              className="form-control"
              name="icon"
              value={input?.icon}
              onChange={handleInputChange}
            />
          </div>
          <div className="">
            <label htmlFor="">Parent Name</label>
            <select
              name="parentCategory"
              value={input?.parentCategory}
              className="form-control"
              onChange={handleInputChange}
            >
              <option value="">{input?.parentCategory?.name ? input?.parentCategory?.name : "--select--" }</option>
              {category?.map((pcat, index) => {
                return (
                  <option value={pcat._id} key={index}>
                    {pcat.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="my-3">
            <img src={input?.photo} className="w-100" alt="" />
          </div>
          <div className="my-3">
            <label htmlFor="">Category Photo</label>
            <input
              type="file"
              className="form-control"
              name="logo"
              onChange={(e) => handleOnChangePhoto(e)}
            />
          </div>

          <div className="my-3">
            <button className="btn btn-primary btn-block" type="submit">
              {loader ? "Category data creating....." : "Update Category"}
            </button>
          </div>
        </form>
      </ModalPopup>
    </div>
  );
};
UpdateCategory.propTypes = {
  idEdit: PropTypes.any, // You can replace `any` with the actual prop type
  modal: PropTypes.any, // You can replace `any` with the actual prop type
};

export default UpdateCategory;
