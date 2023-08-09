import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo-white.png";
import { useEffect, useState } from "react";
import { createToast } from "../../helpers/toast";
import { setMessageEmpty } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authApiSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { error, message, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  // handle input change
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle login submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!input.email || !input.password) {
      createToast("All fields are required", "error");
    } else {
      dispatch(loginUser(input));
      setInput({
        email: "",
        password: "",
      });
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

    if (user) {
      navigate("/");
    }
  }, [error, message, user, dispatch, navigate]);
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
                  <h1>Login</h1>
                  <p className="account-subtitle">Access to our dashboard</p>

                  <form onSubmit={handleLoginSubmit}>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={input.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Password"
                        name="password"
                        value={input.password}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        Login
                      </button>
                    </div>
                  </form>

                  <div className="text-center forgotpass">
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </div>
                  <div className="login-or">
                    <span className="or-line"></span>
                    <span className="span-or">or</span>
                  </div>

                  <div className="text-center dont-have">
                    Don’t have an account? <Link to="/register">Register</Link>
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

export default Login;
