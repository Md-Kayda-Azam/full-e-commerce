import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// create provate gard
const PublicGard = () => {
  const { user } = useSelector((state) => state.auth);

  if (localStorage.getItem("user")) {
    return user ? <Navigate to="/" /> : <Outlet />;
  }

  return <Outlet />;
};

// export default
export default PublicGard;
