import React, { useState, useRef, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/authContext';
const SignupModal = ({ isOpen, onClose, initialEmail = '' }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState(initialEmail);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState('');
    const modalRef = useRef(null);
    const { signup } = useAuth();
    // Set email when the initialEmail prop changes
    useEffect(() => {
        setEmail(initialEmail);
    }, [initialEmail]);

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        // Basic validation
        if (!name.trim()) {
            setFormError('Please enter your name');
            return;
        }

        if (!email.trim() || !email.includes('@')) {
            setFormError('Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            setFormError('Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            setFormError('Passwords do not match');
            return;
        }

        // Handle form submission here (e.g., API call)
        const response = await signup(name, email, password)
        console.log(response);

        // Show success and close modal after delay
        setFormError('Account created successfully!');
        setTimeout(() => {
            onClose();

            setName('');
            setPassword('');
            setConfirmPassword('');
        }, 2000);
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
                    <h3 className="text-2xl font-bold">Create an Account</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800"
                    >
                        <IoMdClose className="text-2xl" />
                    </button>
                </div>

                {formError && (
                    <div className={`p-3 mb-4 rounded ${formError.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {formError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your name"
                        />
                    </div>

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
                                placeholder="Create a password"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Confirm your password"
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200"
                        >
                            Create Account
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-500 mt-4">
                        Already have an account? <a href="#" className="text-indigo-600 hover:text-indigo-800">Sign in</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignupModal;