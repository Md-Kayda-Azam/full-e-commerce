import { createBrowserRouter } from "react-router-dom";
import publicRoute from "./publicRoute";
import privateRoute from "./privateRoute";

// create browser route
const router = createBrowserRouter([...publicRoute, ...privateRoute]);

// export default
export default router;
