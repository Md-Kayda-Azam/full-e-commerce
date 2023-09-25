import { Link } from "react-router-dom";
import avater from "../../assets/img/profiles/avatar-01.jpg";
import PasswordChange from "./PasswordChange";
import { getAuthData } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { messageToaster, profilePhotoChange } from "../../utils/tools";
import UpdateProfile from "../../components/Modals/ProfileModals/UpdateProfile";
import { profilePhotoUpdate } from "../../features/auth/authApiSlice";

const Profile = () => {
  const { user, error, message } = useSelector(getAuthData);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    logo: "",
    photo: null,
  });

  // validation
  useEffect(() => {
    messageToaster(dispatch, error, message);
  }, [error, message, dispatch]);

  const handleFileChange = (e) => {
    const updatedInput = profilePhotoChange(input, e, setInput); // Use the returned updated input
    const form_data = new FormData();
    form_data.append("profilePhoto", updatedInput.logo); // Use updatedInput.logo
    dispatch(profilePhotoUpdate({ data: form_data, id: user._id }));
  };

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
                    <label htmlFor="fileInput">
                      <img
                        className="rounded-circle"
                        alt="User Image"
                        src={user.photo ? user.photo : avater}
                        style={{
                          cursor: "pointer",
                        }}
                      />
                    </label>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="fileInput"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e)}
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
                          <p className="col-sm-10">{user?.name}</p>
                        </div>

                        <div className="row">
                          <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                            Email :
                          </p>
                          <p className="col-sm-10">{user?.email}</p>
                        </div>
                        <div className="row">
                          <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                            Mobile :
                          </p>
                          <p className="col-sm-10">{user?.mobile}</p>
                        </div>
                        <div className="row">
                          <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                            Gender :
                          </p>
                          <p className="col-sm-10">{user?.gender}</p>
                        </div>
                        <div className="row">
                          <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                            City :
                          </p>
                          <p className="col-sm-10">{user?.city}</p>
                        </div>
                        <div className="row">
                          <p className="col-sm-2 text-muted text-sm-right mb-0">
                            Country :
                          </p>
                          <p className="col-sm-10 mb-0">{user?.country}</p>
                        </div>
                      </div>
                    </div>

                    <UpdateProfile show="userEditModalPopup" />
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
