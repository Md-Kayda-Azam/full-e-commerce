import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo-white.png";
import { useEffect, useState } from "react";
import { createToast } from "../../helpers/toast";
import { useDispatch, useSelector } from "react-redux";
import { isEmail } from "../../../../api/helper/validate";
import { forgotPassword } from "../../features/auth/authApiSlice";
import { setMessageEmpty } from "../../features/auth/authSlice";

const ForgotPassword = () => {
  const { error, message } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const [input, setInput] = useState("");

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input) {
      createToast("Please feilds in the gap.");
    } else {
      if (!isEmail(input)) {
        createToast("Invalid email address!");
      } else {
        dispatch(forgotPassword({ email: input }));
        setInput("");
      }
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
      naviagte("/recover-code");
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
                  <h1>Forgot Password?</h1>
                  <p className="account-subtitle">
                    Enter your email to get a password reset link
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-group mb-0">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        Reset Password
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

export default ForgotPassword;
