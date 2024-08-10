import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
// import authService from '../services/authService';
import { AuthContext } from "../contexts/AuthProvider";
import { useAuth } from '../contexts/AuthProvider';

const ResetPassword = () => {
    const { token } = useParams();
    const { resetPassword } = useAuth();
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(token, newPassword);
            setMessage('Password has been reset successfully.');
        } catch (error) {
            setMessage('Error resetting password. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-2 bg-green text-white rounded-md hover:bg-green-600"
                    >
                        Reset Password
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-green-600">{message}</p>}
            </div>
        </div>
    );
};


export default ResetPassword;
