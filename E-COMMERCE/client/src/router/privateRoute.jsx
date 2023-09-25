import Layout from "../components/Layout/Layout";
import User from "../pages/Users/User";
import Brand from "../pages/brand/Brand";
import Category from "../pages/category/Category";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import Order from "../pages/order/Order";
import Permission from "../pages/permission/Permission";
import Product from "../pages/product/Product";
import Profile from "../pages/profile/Profile";
import Role from "../pages/role/Role";
import Tag from "../pages/tag/Tag";
import PrivateGard from "./PrivateGard";

// create private route
const privateRoute = [
  {
    element: <PrivateGard />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <AdminDashboard />,
          },
          {
            path: "/user",
            element: <User />,
          },
          {
            path: "/roles",
            element: <Role />,
          },
          {
            path: "/permission",
            element: <Permission />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/brand",
            element: <Brand />,
          },
          {
            path: "/tag",
            element: <Tag />,
          },
          {
            path: "/category",
            element: <Category />,
          },
          {
            path: "/product",
            element: <Product />,
          },
          {
            path: "/order",
            element: <Order />,
          },
        ],
      },
    ],
  },
];

// export default

export default privateRoute;
