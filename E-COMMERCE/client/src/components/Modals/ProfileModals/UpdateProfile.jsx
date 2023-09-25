import { useDispatch, useSelector } from "react-redux";
import ModalPopup from "../../ModalPopup/ModalPopup";
import useFormFrilds from "../../../hooks/inputFeildsForm";
import { getAuthData } from "../../../features/auth/authSlice";
import { createToast } from "../../../helpers/toast";
import { profileUpdate } from "../../../features/auth/authApiSlice";
import PropTypes from "prop-types";

const UpdateProfile = ({ show }) => {
  const { user } = useSelector(getAuthData);
  const dispatch = useDispatch();
  const [input, handleInputChange, resetForm] = useFormFrilds({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    gender: user.gender,
    city: user.city,
    country: user.country,
  });
  /// handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !input.name ||
      !input.email ||
      !input.mobile ||
      !input.gender ||
      !input.city ||
      !input.country
    ) {
      createToast("All fields are required", "error");
    } else {
      dispatch(
        profileUpdate({
          id: user._id,
          name: input.name,
          email: input.email,
          mobile: input.mobile,
          gender: input.gender,
          city: input.city,
          country: input.country,
        })
      );
      resetForm();
    }
  };
  return (
    <ModalPopup target={show} title="Add new permission">
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
          <label htmlFor="">Mobile</label>
          <input
            type="text"
            className="form-control"
            name="mobile"
            value={input.mobile}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-3">
          <label htmlFor="">City</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={input.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-3">
          <label htmlFor="">Country</label>
          <input
            type="text"
            className="form-control"
            name="country"
            value={input.country}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-3">
          <label htmlFor="">Gender</label>
          <select
            id="gender"
            name="gender"
            className="form-control"
            value={input.gender}
            onChange={handleInputChange}
          >
            <option value="none" selected>
              Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
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
UpdateProfile.propTypes = {
  show: PropTypes.any,
};
export default UpdateProfile;
