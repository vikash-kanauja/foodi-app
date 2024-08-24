// import React, { useContext } from 'react'
// import { AuthContext } from '../contexts/AuthProvider'
// import { Navigate, useLocation } from "react-router-dom"
// import LoadingSpinner from '../components/LoadingSpinner';

// const PrivateRouter = ({children}) => {
//     const {user, loading} =  useContext(AuthContext);
//     const location = useLocation();
//     if(loading) {
//         return (
//             <p>Loading</p>
//         )
//     }
//     if(user) {
//         return children;
//     }
//   return <Navigate to="/login" state={{from: location}} replace></Navigate>
  
// }

// export default PrivateRouter



import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth'; // Custom hook for auth
import { AuthContext } from "../contexts/AuthProvider";
const PrivateRoute = ({ element, adminOnly = false }) => {
//   const { user, isLoading } = useAuth();

  const { user,loading } = useContext(AuthContext);
console.log(user,"from private route");

  // Handle loading state
  if (loading) return <div>Loading...</div>;

  // If not authenticated, redirect to login
  if (!user) return <Navigate to="/login" />;

  // If adminOnly and the user is not an admin, redirect to access denied
  if (adminOnly && !(user.role=="admin")) return <Navigate to="/access-denied" />;

  return element;
};

export default PrivateRoute;
