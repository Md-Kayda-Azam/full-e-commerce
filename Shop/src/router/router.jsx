import { createBrowserRouter } from "react-router-dom";
import publicRoute from "./publicRoute";
import privateRoute from "./privateRoute";
import Loyouts from "../layouts/Loyouts";

// create browser route
const router = createBrowserRouter([
  {
    element: <Loyouts />,
    children: [...publicRoute, ...privateRoute],
  },
]);

// export default
export default router;
