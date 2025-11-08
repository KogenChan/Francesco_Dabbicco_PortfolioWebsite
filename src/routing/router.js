import { createBrowserRouter } from "react-router";
import Layout from "../layouts/GlobalLayout";
import Home from "../views/home";
import routes from "./routes.min";

const router = createBrowserRouter([
   {
      path: routes.home,
      Component: Layout,
      children: [
         {
            index: true,
            Component: Home
         }
      ]
   }
]);

export default router;