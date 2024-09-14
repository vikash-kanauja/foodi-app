import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoBagCheck } from "react-icons/io5";
import { MdAddCircle } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import logo from "/logo.png";

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to={"/home"}>
        <FaHome />
        Home
      </Link>
    </li>
    <li>
      <Link to={"/menu"}>
        <FaCartShopping />
        Menu
      </Link>
    </li>
    <li>
      <Link to={"/dashboard"}>
        <TbTruckDelivery />
        Order Tracking
      </Link>
    </li>
    <li>
      <Link to={"/dashboard"}>
        <RiCustomerService2Fill />
        Customer Support
      </Link>
    </li>
  </>
);

const DashboardLayout = () => {
  return (
    // <div className="flex">
    //   <div className="w-80 bg-base-200 text-base-content min-h-screen p-4">
    //     {/* Sidebar content here */}
    //     <ul className="menu">
    //       <li>
    //         <Link to={'/dashboard'}>Dashboard</Link>
    //       </li>
    //       <li>
    //         <Link to={'/dashboard/users'}>All User</Link>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="flex-1 p-6">
    //     {/* Page content here */}
    //     <Outlet/>
    //     <h1 className="text-2xl font-bold">Main Content Area</h1>
    //     <p>Your content goes here.</p>
    //   </div>
    // </div>

    <div className="drawer sm:drawer-open ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <div className="flex justify-between items-center px-4 py-2 w-full">
          <label
            htmlFor="my-drawer-2"
            className="drawer-button bg-green p-1.5 rounded-md text-2xl sm:hidden"
          >
            <MdDashboardCustomize />
          </label>
          <button
            onClick={() => navigate("/login")}
            className=" p-2 flex items-center gap-2 rounded-full px-4 bg-green text-white text-sm sm:hidden"
          >
            <FaRegUser /> Logout
          </button>
        </div>
        <div className=" min-w-full mt-5 md:mt-2 mx-4 ">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            <Link to={"/dashboard"} className="flex justify-start mr-4">
              <img src={logo} alt="logo" className="w-20 " />
              <span className="badge  badge-primary">primary</span>
            </Link>
          </li>
          <hr />
          <li>
            <Link to={"/dashboard"}>
              <MdDashboard />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to={""}>
              <IoBagCheck />
              Manage Bookings
            </Link>
          </li>
          <li>
            <Link to={"/dashboard"}>
              <MdAddCircle />
              Add Menu
            </Link>
          </li>
          <li>
            <Link to={"/dashboard"}>
              <FaEdit />
              Manage items
            </Link>
          </li>
          <li className="mb-3">
            <Link to={"/dashboard/users"}>
              <FaUsers />
              Users
            </Link>
          </li>
          <hr/>
          {
            sharedLinks
          }
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
