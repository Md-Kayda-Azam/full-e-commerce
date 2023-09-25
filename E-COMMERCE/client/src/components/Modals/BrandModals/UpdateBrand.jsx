import { useDispatch, useSelector } from "react-redux";
import { updatedProductBrand } from "../../../features/product/productApiSlice";
import useFormFrilds from "../../../hooks/inputFeildsForm";
import ModalPopup from "../../ModalPopup/ModalPopup";
import { filterById, photoChange } from "../../../utils/tools";
import PropTypes from "prop-types";
import { useEffect } from "react";

const UpdateBrand = ({ show, idEdit }) => {
  const dispatch = useDispatch();
  const { brand, loader } = useSelector((state) => state.product);
  const [input, handleInputChange, resetForm, setInput] = useFormFrilds({
    name: "",
    logo: null,
    photo: null,
  });

  // handle onChange photo
  const handleonChangeLogo = (e) => {
    photoChange(setInput, e);
  };

  // filter id data for updated brand
  useEffect(() => {
    filterById(brand, idEdit, setInput);
  }, [brand, idEdit, setInput]);

  // handle brand data created
  const handleCreateBrand = (e) => {
    e.preventDefault();

    const form_data = new FormData();

    form_data.append("name", input.name);
    form_data.append("brandPhoto", input.logo);

    dispatch(updatedProductBrand({ data: form_data, id: idEdit }));

    resetForm();
  };

  return (
    <ModalPopup target={show} title="Updated brand">
      <form onSubmit={handleCreateBrand}>
        <div className="my-3">
          <label htmlFor="">Brand Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={input?.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-3">
          <img src={input?.photo} className="w-100" alt="" />
        </div>
        <div className="my-3">
          <label htmlFor="">Brand logo</label>
          <input
            type="file"
            className="form-control"
            name="logo"
            onChange={(e) => handleonChangeLogo(e)}
          />
        </div>

        <div className="my-3">
          <button className="btn btn-primary btn-block" type="submit">
            {loader ? "Brand data creating....." : "Updated Brand"}
          </button>
        </div>
      </form>
    </ModalPopup>
  );
};
UpdateBrand.propTypes = {
  show: PropTypes.any, // You can replace `any` with the actual prop type
  idEdit: PropTypes.any, // You can replace `any` with the actual prop type
};
export default UpdateBrand;
