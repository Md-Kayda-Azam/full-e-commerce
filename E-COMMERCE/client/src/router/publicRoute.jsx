import ChangePassword from "../pages/auth/ChangePassword";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import PassActCode from "../pages/auth/PassActCode";
import Register from "../pages/auth/Register";
import PublicGard from "./PublicGard";

// create public route
const publicRoute = [
  {
    element: <PublicGard />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/recover-code",
        element: <PassActCode />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
    ],
  },
];

// export default

export default publicRoute;
