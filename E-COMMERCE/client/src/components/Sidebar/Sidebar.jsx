import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../../hooks/useAuthUser";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getAllPermission,
  getAllRoles,
  getAllUsers,
} from "../../features/user/userApiSlice";

const Sidebar = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const { user } = useAuthUser();

  useEffect(() => {
    dispatch(getAllPermission());
    dispatch(getAllRoles());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>Main</span>
              </li>
              {user?.role?.permissions?.includes("Dashboard") && (
                <li className={location.pathname === "/" ? "active" : ""}>
                  <Link to="/">
                    <i className="fe fe-home"></i> <span>Dashboard</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("Orders") && (
                <li className="">
                  <Link to="/users">
                    <i className="fe fe-users"></i> <span>Orders</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("Products") && (
                <li className="">
                  <Link to="/users">
                    <i className="fe fe-users"></i> <span>Products</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("Category") && (
                <li className="">
                  <Link to="/users">
                    <i className="fe fe-users"></i> <span>Category</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("Tags") && (
                <li className="">
                  <Link to="/users">
                    <i className="fe fe-users"></i> <span>Tags</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("Brands") && (
                <li className="">
                  <Link to="/users">
                    <i className="fe fe-users"></i> <span>Brands</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("Users") && (
                <li className={location.pathname === "/users" ? "active" : ""}>
                  <Link to="/users">
                    <i className="fe fe-users"></i> <span>Users</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("Roles") && (
                <li className={location.pathname === "/roles" ? "active" : ""}>
                  <Link to="/roles">
                    <i className="fa fa-anchor"></i> <span>Roles</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("Permission") && (
                <li
                  className={
                    location.pathname === "/permission" ? "active" : ""
                  }
                >
                  <Link to="/permission">
                    <i className="fa fa-lock"></i> <span>Permission</span>
                  </Link>
                </li>
              )}
              <li className="menu-title">
                <span>Pages</span>
              </li>
              <li className={location.pathname === "/profile" ? "active" : ""}>
                <Link to="/profile">
                  <i className="fe fe-user-plus"></i> <span>Profile</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
