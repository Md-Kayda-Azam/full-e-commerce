import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// create provate gard
const PrivateGard = () => {
  const { user } = useSelector((state) => state.auth);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

// export default
export default PrivateGard;
