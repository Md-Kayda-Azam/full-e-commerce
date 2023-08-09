import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo-white.png";
import useFormFrilds from "../../hooks/inputFeildsForm";
import Cookies from "js-cookie";
import { createToast } from "../../helpers/toast";
import { useDispatch, useSelector } from "react-redux";
import { ChangePasswordReset } from "../../features/auth/authApiSlice";
import { useEffect } from "react";
import { setMessageEmpty } from "../../features/auth/authSlice";

const ChangePassword = () => {
  const { error, message } = useSelector((state) => state.auth);

  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const code = Cookies.get("cpcode");
  const id = Cookies.get("cpid");

  const [input, handleInputChange, resetForm] = useFormFrilds({
    password: "",
    cPassword: "",
  });

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.password || !input.cpassword) {
      createToast("All fields are required", "error");
    } else if (input.password != input.cpassword) {
      createToast("Password not match", "warn");
    } else {
      dispatch(
        ChangePasswordReset({ code: code, id: id, password: input.cpassword })
      );
      Cookies.remove("tokenCheck");
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
      naviagte("/login");
    }
  }, [error, message, dispatch, naviagte]);
  return (
    <>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img className="img-fluid" src={logo} alt="Logo" />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>Change Password</h1>
                  <p className="account-subtitle">Enter your new password.</p>

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        name="password"
                        value={input.password}
                        onChange={handleInputChange}
                        placeholder="New Password"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        name="cpassword"
                        value={input.cpassword}
                        onChange={handleInputChange}
                        placeholder="Confirm New Password"
                      />
                    </div>
                    <div className="form-group mb-0">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        Confirm
                      </button>
                    </div>
                  </form>

                  <div className="text-center dont-have">
                    Remember your password? <Link to="/login">Login</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
