import { useDispatch, useSelector } from "react-redux";
import useFormFrilds from "../../hooks/inputFeildsForm";
import { createToast } from "../../helpers/toast";
import { getAuthData, setMessageEmpty } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { profilePasswordChange } from "../../features/auth/authApiSlice";

const PasswordChange = () => {
  const { user, error, message } = useSelector(getAuthData);
  const dispatch = useDispatch();

  const [input, handleInputChange, resetForm] = useFormFrilds({
    oPassword: "",
    password: "",
    cPassword: "",
  });

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.oPassword || !input.password || !input.cPassword) {
      createToast("All fields are required", "error");
    } else if (input.password != input.cPassword) {
      createToast("Password not match", "warn");
    } else {
      dispatch(
        profilePasswordChange({
          id: user._id,
          oldPassword: input.oPassword,
          password: input.password,
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
      <div id="password_tab" className="tab-pane fade">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Change Password</h5>
            <div className="row">
              <div className="col-md-10 col-lg-6">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Old Password</label>
                    <input
                      type="password"
                      name="oPassword"
                      value={input.oPassword}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      name="password"
                      value={input.password}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      name="cPassword"
                      value={input.cPassword}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <button className="btn btn-primary" type="submit">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordChange;
