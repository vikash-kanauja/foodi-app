// // Login.js
// import React, { useState } from 'react';
// import { useAuth } from '../contexts/AuthProvider';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const { login } = useAuth();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate(); // Hook for navigation

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch('http://localhost:4000/api/auth/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email, password }),
//                 credentials: 'include' // Ensure cookies are included with the request
//             });

//             if (!response.ok) {
//                 throw new Error('Login failed');
//             }

//             const userData = await response.json();

//             // Update context with user data
//             login(userData);
//             console.log(userData);
            

//             // Redirect to home or another page after login
//             navigate('/'); // Adjust the path as needed

//         } catch (err) {
//             console.log(err);
            
//             setError(err.message);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>Login</h2>
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
//             <button type="submit">Login</button>
//             {error && <p>{error}</p>}
//         </form>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const userData = await response.json();

            // Update context with user data
            login(userData);

            // Redirect to home or another page after login
            navigate('/'); // Adjust the path as needed

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
            <div className="modal-action flex flex-col justify-center mt-0">
                <form onSubmit={handleSubmit} className="card-body">
                    <h3 className="font-bold text-lg">Login</h3>

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

                    {/* Login Button */}
                    <div className="form-control mt-6">
                        <button type="submit" className="btn bg-green-500 bg-green text-white">
                            Login
                        </button>
                    </div>

                    {/* Link to Signup */}
                    <p className="text-center my-2">
                        Don't have an account?{' '}
                        <a href="/signup" className="underline text-red-500 ml-1">
                            Signup
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
