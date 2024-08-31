import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";

const Profile = ({ name,loading }) => {
  console.log(name, "From profile");
  const { logout } = useContext(AuthContext);
  // const handleLogout = () => {
  //   logout().then(() => {
  //     // Sign-out successful.
  //   }).catch((error) => {
  //     // An error happened.
  //   });
  // }

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect or update UI after successful logout
      // For example, redirect to login page or home page
      window.location.href = "/login"; // Or use a navigation library to redirect
    } catch (error) {
      console.error("Logout error:", error);
      // Handle error, display a message to the user, etc.
    }
  };

  console.log(name, "From profile");

  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">

              {
                loading ? <div><div className="loading-indicator">Loading...</div></div> : name 
                //   user.photoURL ? <img
                //   alt="Tailwind CSS Navbar component"
                //   src={user.photoURL}
                // /> : <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              }
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a href="/update-profile">Profile</a>
            </li>
            <li>
              <a>Order</a>
            </li>
            <li>
            <a>Setting</a>
            </li>
            <li>
            <Link to={'/dashboard'}>Dashboard </Link>
        
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
