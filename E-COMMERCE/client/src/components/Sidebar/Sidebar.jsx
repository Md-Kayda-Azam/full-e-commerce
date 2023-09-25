import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../../hooks/useAuthUser";
import { useEffect } from "react";
import {
  getAllPermission,
  getAllRoles,
  getAllUsers,
} from "../../features/user/userApiSlice";
import {
  getAllBrands,
  getAllCategories,
  getAllTags,
} from "../../features/product/productApiSlice";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuthUser();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPermission());
    dispatch(getAllRoles());
    dispatch(getAllUsers());
    dispatch(getAllBrands());
    dispatch(getAllTags());
    dispatch(getAllCategories());
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
                  <Link to="/order">
                    <i className="fe fe-users"></i> <span>Orders</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("Products") && (
                <li className="">
                  <Link to="/product">
                    <i className="fe fe-users"></i> <span>Products</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("Category") && (
                <li
                  className={location.pathname === "/category" ? "active" : ""}
                >
                  <Link to="/category">
                    <i className="fe fe-users"></i> <span>Category</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("Tag") && (
                <li className={location.pathname === "/tag" ? "active" : ""}>
                  <Link to="/tag">
                    <i className="fe fe-users"></i> <span>Tag</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Brands") && (
                <li className={location.pathname === "/brand" ? "active" : ""}>
                  <Link to="/brand">
                    <i className="fe fe-users"></i> <span>Brands</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("Users") && (
                <li className={location.pathname === "/user" ? "active" : ""}>
                  <Link to="/user">
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
