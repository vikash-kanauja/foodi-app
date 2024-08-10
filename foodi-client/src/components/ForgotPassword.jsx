import React, { useState } from 'react';
// import authService from '../services/authService';
// import { AuthContext } from "../contexts/AuthProvider";
import { useAuth } from '../contexts/AuthProvider';

const ForgotPassword = () => {
    const { forgotPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword(email);
            setMessage('Password reset link sent. Please check your email.');
        } catch (error) {
            setMessage('Error sending reset link. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-2 bg-green text-white rounded-md hover:bg-green-600"
                    >
                        Send Reset Link
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-green-600">{message}</p>}
            </div>
        </div>
    );
};


export default ForgotPassword;
