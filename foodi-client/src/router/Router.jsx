import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import Login from "../components/login";
import ResetPasswordPage from "../pages/dashboard/ResetPasswordPage";
import ForgotPasswordPage from "../pages/dashboard/ForgotPasswordPage"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu/>,
      },
      {
        path: "/update-profile",
        element: <UpdateProfile/>
      },
      {
        path:"/forgot-password",
        element:<ForgotPasswordPage />
      },
      {
        path:"/reset-password/:token",
        element:<ResetPasswordPage />
      }
    ],
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/login",
    element: <Login/>
  }
]);

export default router;
