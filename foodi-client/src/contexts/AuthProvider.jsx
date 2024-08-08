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
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/auth/verify', {
                method: 'GET',
                credentials: 'include'
            });

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

    useEffect(() => {
        checkAuth();
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    // const logout = () => {
    //     setUser(null);
    //     // Optionally make a request to your backend to log out
    // };

    const logout = async () => {
        try {
          // Make a request to your backend to log out
          await fetch('http://localhost:4000/api/auth/logout', {
            method: 'POST',
            credentials: 'include' // Ensure cookies are sent with the request
          });
      
          // Clear user state
          setUser(null);
        } catch (error) {
          console.error('Logout request failed:', error);
          throw error; // Rethrow to handle in Profile component
        }
      };
      

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Export AuthContext to be used with useContext
export { AuthContext };

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
// export default AuthProvider