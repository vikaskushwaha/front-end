import React, { useState, useRef, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/authContext';

const SigninModal = ({ isOpen, onClose, onSignupClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState('');
    const modalRef = useRef(null);

    // Get login function from auth context
    const { login, loading } = useAuth();

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        // Basic validation
        if (!email.trim() || !email.includes('@')) {
            setFormError('Please enter a valid email address');
            return;
        }

        if (!password) {
            setFormError('Please enter your password');
            return;
        }

        try {
            // Call login function from auth context
            const response = await login(email, password);

            if (!response.success) {
                setFormError(response.error || 'Login failed. Please check your credentials.');
                return;
            }

            // Success - show message and close modal
            setFormError('Login successful!');
            setTimeout(() => {
                onClose();
                setEmail('');
                setPassword('');
            }, 1500);

        } catch (error) {
            setFormError('An error occurred during login');
            console.error('Login error:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
            onClick={handleOutsideClick}
        >
            <div
                ref={modalRef}
                className="bg-white text-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">Sign In</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800"
                    >
                        <IoMdClose className="text-2xl" />
                    </button>
                </div>

                {formError && (
                    <div className={`p-3 mb-4 rounded ${formError.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {formError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <div className="flex justify-end mt-1">
                            <a href="#" className="text-xs text-indigo-600 hover:text-indigo-800">Forgot password?</a>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200 disabled:bg-indigo-300"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </div>
                            ) : 'Sign In'}
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-500 mt-4">
                        Don't have an account?{' '}
                        <button
                            type="button"
                            onClick={() => {
                                onClose();
                                if (onSignupClick) onSignupClick();
                            }}
                            className="text-indigo-600 hover:text-indigo-800"
                        >
                            Create account
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SigninModal;