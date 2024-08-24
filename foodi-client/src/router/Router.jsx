// import { createBrowserRouter } from "react-router-dom";
// import Main from "../layout/Main";
// import Home from "../pages/home/Home";
// import Menu from "../pages/shop/Menu";
// import Signup from "../components/Signup";
// import UpdateProfile from "../pages/dashboard/UpdateProfile";
// import Login from "../components/login";
// import ResetPasswordPage from "../pages/dashboard/ResetPasswordPage";
// import ForgotPasswordPage from "../pages/dashboard/ForgotPasswordPage"
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Main />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/menu",
//         element: <Menu/>,
//       },
//       {
//         path: "/update-profile",
//         element: <UpdateProfile/>
//       },
//       {
//         path:"/forgot-password",
//         element:<ForgotPasswordPage />
//       },
//       {
//         path:"/reset-password/:token",
//         element:<ResetPasswordPage />
//       }
//     ],
//   },
//   {
//     path: "/signup",
//     element: <Signup/>
//   },
//   {
//     path: "/login",
//     element: <Login/>
//   }
// ]);

// export default router;


import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
// import AdminLayout from "../layout/AdminLayout";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import Login from "../components/Login";
import ResetPasswordPage from "../pages/dashboard/ResetPasswordPage";
import ForgotPasswordPage from "../pages/dashboard/ForgotPasswordPage";
// import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/adminPages/AdminUsers";
import AdminSettings from "../pages/adminPages/AdminSettings";
import PrivateRoute from "../PrivateRouter/PrivateRouter"; // Custom component
import AccessDenied from "../pages/AcessDenied"; // Page for unauthorized access
import CartPage from "../pages/shop/CartPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/menu",
        element: <PrivateRoute element={<Menu />} /> // Protected route
      },
      {
        path: "/update-profile",
        element: <PrivateRoute element={<UpdateProfile />} /> // Protected route
      },
      {
        path:"/cart-page",
        element:<CartPage/>
      }
    ],
  },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  {
    path: "/forgot-password",
    element: <PrivateRoute element={<ForgotPasswordPage />} /> // Protected route
  },
  {
    path: "/reset-password/:token",
    element: <PrivateRoute element={<ResetPasswordPage />} /> // Protected route
  },
  // { path: "/", element: <PrivateRoute element={<AdminDashboard />} adminOnly /> }, // Admin dashboard
      { path: "/users", element: <PrivateRoute element={<AdminUsers />} adminOnly /> }, // Admin users
      { path: "/settings", element: <PrivateRoute element={<AdminSettings />} adminOnly /> }, // Admin settings
  // {
  //   path: "/admin",
  //   element: <PrivateRoute element={<AdminLayout />} adminOnly />, // Admin layout
  //   children: [
  //     { path: "/", element: <PrivateRoute element={<AdminDashboard />} adminOnly /> }, // Admin dashboard
  //     { path: "/users", element: <PrivateRoute element={<AdminUsers />} adminOnly /> }, // Admin users
  //     { path: "/settings", element: <PrivateRoute element={<AdminSettings />} adminOnly /> }, // Admin settings
  //   ],
  // },
  { path: "/access-denied", element: <AccessDenied /> }, // Page for unauthorized access
]);

export default router;
