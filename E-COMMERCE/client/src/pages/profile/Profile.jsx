import { Link } from "react-router-dom";
import avater from "../../assets/img/profiles/avatar-01.jpg";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import useFormFrilds from "../../hooks/inputFeildsForm";
import PasswordChange from "./PasswordChange";
import { createToast } from "../../helpers/toast";
import { getAuthData, setMessageEmpty } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { profileUpdate } from "../../features/auth/authApiSlice";

const Profile = () => {
  const { user, error, message } = useSelector(getAuthData);
  const dispatch = useDispatch();
  const [input, handleInputChange, resetForm] = useFormFrilds({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    city: "",
    country: "",
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
  // validation
  useEffect(() => {
    if (error) {
      createToast(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [error, message, dispatch]);
  return (
    <>
      <div className="content container-fluid" style={{ padding: "0px" }}>
        <div className="page-header">
          <div className="row">
            <div className="col">
              <h3 className="page-title">Profile</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Profile</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="profile-header">
              <div className="row align-items-center">
                <div className="col-auto profile-image">
                  <a href="#">
                    <img
                      className="rounded-circle"
                      alt="User Image"
                      src={avater}
                    />
                  </a>
                </div>
                <div className="col ml-md-n2 profile-user-info">
                  <h4 className="user-name mb-0">Ryan Taylor</h4>
                  <h6 className="text-muted">ryantaylor@admin.com</h6>
                  <div className="user-Location">
                    <i className="fa fa-map-marker"></i> Florida, United States
                  </div>
                  <div className="about-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-menu">
              <ul className="nav nav-tabs nav-tabs-solid">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#per_details_tab"
                  >
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#password_tab"
                  >
                    Password
                  </a>
                </li>
              </ul>
            </div>
            <div className="tab-content profile-tab-cont">
              <div className="tab-pane fade show active" id="per_details_tab">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title d-flex justify-content-between">
                          <span>Personal Details</span>
                          <a
                            className="edit-link"
                            data-target="#userEditModalPopup"
                            data-toggle="modal"
                            href="#edit_personal_details"
                          >
                            <i className="fa fa-edit mr-1"></i>Edit
                          </a>
                        </h5>
                        <div className="row">
                          <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                            Name :
                          </p>
                          <p className="col-sm-10">John Doe</p>
                        </div>

                        <div className="row">
                          <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                            Email :
                          </p>
                          <p className="col-sm-10">johndoe@example.com</p>
                        </div>
                        <div className="row">
                          <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                            Mobile :
                          </p>
                          <p className="col-sm-10">305-310-5857</p>
                        </div>
                        <div className="row">
                          <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                            Gender :
                          </p>
                          <p className="col-sm-10">Male</p>
                        </div>
                        <div className="row">
                          <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                            City :
                          </p>
                          <p className="col-sm-10">Dinajpur</p>
                        </div>
                        <div className="row">
                          <p className="col-sm-2 text-muted text-sm-right mb-0">
                            Country :
                          </p>
                          <p className="col-sm-10 mb-0">Bangladesh</p>
                        </div>
                      </div>
                    </div>

                    <ModalPopup
                      target="userEditModalPopup"
                      title="Add new permission"
                    >
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
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>

                        <div className="my-3">
                          <button
                            className="btn btn-primary btn-block"
                            type="submit"
                          >
                            Add new permission
                          </button>
                        </div>
                      </form>
                    </ModalPopup>
                  </div>
                </div>
              </div>

              <PasswordChange />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
