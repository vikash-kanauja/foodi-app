// // import React, { createContext, useEffect, useState } from 'react'
// // // import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
// // // import app from "../firebase/firebase.config"

// // export const AuthContext = createContext();
// // // const auth = getAuth(app);
// // // const googleProvider = new GoogleAuthProvider();

// // const AuthProvider = ({children}) => {
// //     const [user, setUser] = useState(null);
// //     const [loading, setLoading] = useState(true);

// //     // create an account
// //     const createUser = (email, password) => {
// //         setLoading(true);
// //         return createUserWithEmailAndPassword(auth, email, password)
// //     }

// //     // signup with gmail
// //     const signUpWithGmail = () => {
// //       setLoading(true);
// //       return  signInWithPopup(auth, googleProvider)
// //     }

// //     // login using email & password
// //     const login = (email, password) => {
// //         return signInWithEmailAndPassword(auth, email, password);
// //     }

// //     // logout
// //     const logOut = () =>{
// //       return signOut(auth);
// //   }

// //     // update profile
// //     const updateUserProfile = (name, photoURL) => {
// //       return  updateProfile(auth.currentUser, {
// //             displayName: name, photoURL: photoURL
// //           })
// //     }

// //     // check signed-in user
// //     useEffect( () =>{
// //       const unsubscribe = onAuthStateChanged(auth, currentUser =>{
// //           // console.log(currentUser);
// //           setUser(currentUser);
// //           setLoading(false);
// //       });

// //       return () =>{
// //           return unsubscribe();
// //       }
// //   }, [])

// //     const authInfo = {
// //         user,
// //         createUser,
// //         signUpWithGmail,
// //         login,
// //         logOut,
// //         updateUserProfile,
// //         loading
// //     }
// //   return (
// //     <AuthContext.Provider value={authInfo}>
// //         {children}
// //     </AuthContext.Provider>
// //   )
// // }

// // export default AuthProvider

// // AuthContext.js
// import React, { createContext, useState, useContext } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const login = (userData) => {
//         setUser(userData);
//         // Optionally store token or user data in localStorage or sessionStorage
//         localStorage.setItem('user', JSON.stringify(userData)); // Example
//     };

//     const logout = () => {
//         setUser(null);
//         // Optionally remove token or user data from localStorage or sessionStorage
//         localStorage.removeItem('user'); // Example
//     };

//     // Check for existing user data on initial load
//     React.useEffect(() => {
//         const storedUser = localStorage.getItem('user');
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//         }
//         setLoading(false);
//     }, []);

//     return (
//         <AuthContext.Provider value={{ user, login, logout, loading, setLoading }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// // Custom hook to use auth context
// export const useAuth = () => useContext(AuthContext);

// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(null);

  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/verify", {
        method: "GET",
        credentials: "include",
      });
      console.log(response);

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        console.log(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  // first payload show password
  // in user login the cannnot go to the reset page

  useEffect(() => {
    checkAuth();
    
  }, []);

  useEffect(() => {
    if (user) {
        getCart();
    }
}, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      // Make a request to your backend to log out
      await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include", // Ensure cookies are sent with the request
      });

      // Clear user state
      setUser(null);
      console.log(user, "usssesr;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
    } catch (error) {
      console.error("Logout request failed:", error);
      throw error; // Rethrow to handle in Profile component
    }
  };

  // Forgot Password Method
  const forgotPassword = async (email) => {
    const response = await fetch(
      "http://localhost:4000/api/auth/forgot-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) throw new Error("Failed to send reset link");
  };

  // Reset Password Method
  const resetPassword = async (resetToken, newPassword) => {
    console.log(resetToken, "resetTokenresetTokenresetToken", newPassword);
    console.log();

    const response = await fetch(
      "http://localhost:4000/api/auth/reset-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetToken, newPassword }),
        // credentials: 'include'
      }
    );

    if (!response.ok) throw new Error("Failed to reset password");
  };

  const updateQuantity = async (menuItemId, quantity) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/cart/update/${menuItemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // Assuming you're using JWT
          },
          credentials: "include",
          body: JSON.stringify({ quantity }),
        }
      );

      if (!response.ok) throw new Error("Failed to update quantity");

      const updatedCart = await response.json();
      return updatedCart;
    } catch (error) {
      console.error("Error updating quantity:", error);
      throw error;
    }
  };

  // return (
  //     <AuthContext.Provider value={{ user, login, logout, loading, forgotPassword, resetPassword, updateQuantity }}>
  //         {children}
  //     </AuthContext.Provider>
  // );
  // };

  const getCart = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/cart", {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        const cartData = await response.json();
        setCart(cartData);
      } else {
        setCart(null);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        forgotPassword,
        resetPassword,
        updateQuantity,
        getCart,
        cart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Export AuthContext to be used with useContext
export { AuthContext };

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
