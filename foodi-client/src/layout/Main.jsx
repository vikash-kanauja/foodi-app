import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../../src/App.css";
import Footer from "../components/Footer";
// import { AuthContext } from "../contexts/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";

const Main = () => {
  // const {loading} = useContext(AuthContext);
  // {loading ? (
  //   <LoadingSpinner />
  // ) : (
  //   <div>
  //   <Navbar />
  //   <Outlet />
  //   <Footer />
  // </div>
  // )}

  return (
    <div className="bg-prigmayBG">
      
    <div>
      <Navbar />
      <div className="min-h-screen">
      
      <Outlet />
      </div>
      <Footer />
    </div>
    </div>
  );
};

export default Main;
