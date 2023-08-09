import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo-white.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckPaswordCode } from "../../features/auth/authApiSlice";
import Cookies from "js-cookie";
import { createToast } from "../../helpers/toast";
import { setMessageEmpty } from "../../features/auth/authSlice";

const PassActCode = () => {
  const { error, message } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const naviagte = useNavigate();

  const [input, setInput] = useState("");

  const email = Cookies.get("otp");

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(CheckPaswordCode({ code: input, email: email }));
    if (!input) {
      createToast("Please feilds in the gap.");
    } else {
      dispatch(CheckPaswordCode({ email: input }));

      setInput("");
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
      naviagte(`/change-password`);
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
                  <h1>Forgot Password Check Activation Code?</h1>
                  <p className="account-subtitle">
                    Enter your Code to get a password change form.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        value={input}
                        placeholder="Code"
                        onChange={(e) => setInput(e.target.value)}
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

export default PassActCode;
