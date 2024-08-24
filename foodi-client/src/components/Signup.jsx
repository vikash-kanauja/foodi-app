
// import React, { useContext } from "react";
// import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form"
// import Modal from "./Modal";
// import { AuthContext } from "../contexts/AuthProvider";

// const Signup = () => {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//       } = useForm();

//       const {createUser, login} = useContext(AuthContext);
//           // redirecting to home page or specifig page
//     const location = useLocation();
//     const navigate = useNavigate();
//     const from = location.state?.from?.pathname || "/";

//       const onSubmit = (data) => {
//         const email = data.email;
//         const password = data.password;
//         createUser(email, password).then((result) => {
//           // Signed up 
//           const user = result.user;
//           alert("Account creation successfully done!")
//           document.getElementById("my_modal_5").close()
//           navigate(from, {replace: true})
//           // ...
//         })
//         .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           // ..
//         })
//       }
//   return (
//     <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
//         <div className="modal-action flex flex-col justify-center mt-0">
//           <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
//             <h3 className="font-bold text-lg">Create A Account!</h3>

//             {/* email */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Email</span>
//               </label>
//               <input
//                 type="email"
//                 placeholder="email"
//                 className="input input-bordered"
//                 {...register("email")}
//               />
//             </div>

//             {/* password */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Password</span>
//               </label>
//               <input
//                 type="password"
//                 placeholder="password"
//                 className="input input-bordered"
//                 {...register("password")}
//               />
//               <label className="label mt-1">
//                 <a href="#" className="label-text-alt link link-hover">
//                   Forgot password?
//                 </a>
//               </label>
//             </div>

//             {/* error */}

//             {/* login btn */}
//             <div className="form-control mt-6">
//               <input
//                 type="submit"
//                 value="Signup"
//                 className="btn bg-green text-white"
//               />
//             </div>

//             <p className="text-center my-2">
//               Have an account?{" "}
//               <button className="underline text-red ml-1"
//                onClick={() => document.getElementById("my_modal_5").showModal()}
//               >
//                 Login
//               </button>{" "}
//             </p>

//             <Link
//             to="/"
//             className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//             >✕</Link>
//           </form>

//           {/* social sign in */}
//           <div className="text-center space-x-3 mb-5">
//             <button className="btn btn-circle hover:bg-green hover:text-white">
//               <FaGoogle />
//             </button>
//             <button className="btn btn-circle hover:bg-green hover:text-white">
//               <FaFacebookF />
//             </button>
//             <button className="btn btn-circle hover:bg-green hover:text-white">
//             <FaGithub />
//             </button>
//           </div>
//         </div>
//         <Modal/>
//     </div>
//   )
// }

// export default Signup

// Signup.js
// import React, { useState } from 'react';
// import { useAuth } from '../contexts/AuthProvider';

// const Signup = () => {
//     const { login } = useAuth(); // Assuming login function sets the user data after signup
//     const [name, setName] = useState('');

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             // Call your API to create a new user
//             const response = await fetch('http://localhost:4000/api/auth/register', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ name, email, password }),
//             });

//             if (!response.ok) {
//                 throw new Error('Signup failed');
//             }

//             // Assuming the API returns user data
//             const userData = await response.json();

//             // Update context with user data
//             login(userData);

//             // Redirect or show success message
//             // Example: Redirect to login or home page
//             window.location.href = '/login'; // Or use React Router's navigate

//         } catch (err) {
//           console.log(err,"errrrrrrrr");
          
//             setError(err.message);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>Signup</h2>
//             <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Name"
//                 required
//             />
//             <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email"
//                 required
//             />
//             <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 required
//             />
//             <button type="submit">Signup</button>
//             {error && <p>{error}</p>}
//         </form>
//     );
// };

// export default Signup;


import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';

const Signup = () => {
    const { login } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

            const userData = await response.json();
            login(userData);
            window.location.href = '/login';
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
            <div className="modal-action flex flex-col justify-center mt-0">
                <form onSubmit={handleSubmit} className="card-body">
                    <h3 className="font-bold text-lg">Create An Account!</h3>

                    {/* Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Name"
                            className="input input-bordered"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 mt-2">{error}</p>}

                    {/* Signup Button */}
                    <div className="form-control mt-6">
                        <button type="submit" className="btn bg-green-500 bg-green text-white">
                            Signup
                        </button>
                    </div>

                    {/* Link to Login */}
                    <p className="text-center my-2">
                        Have an account?{' '}
                        <a href="/login" className="underline text-red-500 ml-1">
                            Login
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
