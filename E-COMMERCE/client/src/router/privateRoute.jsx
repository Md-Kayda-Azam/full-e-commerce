import Layout from "../components/Layout/Layout";
import Users from "../pages/Users/Users";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import Permission from "../pages/permission/Permission";
import Profile from "../pages/profile/Profile";
import Role from "../pages/role/Role";
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
            path: "/users",
            element: <Users />,
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
        ],
      },
    ],
  },
];

// export default

export default privateRoute;
