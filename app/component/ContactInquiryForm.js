'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/authContext';
import axios from 'axios';
import { IoMdClose } from 'react-icons/io';

const ContactInquiryModal = ({ isOpen, onClose, vehicleId = null, vehicleName = '' }) => {
    const { user, isAuthenticated } = useAuth();
    const modalRef = useRef(null);


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState(vehicleName ? `Inquiry about ${vehicleName}` : '');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => {
        if (user) {
            setName(user.firstName || '');
            setEmail(user.email || '');
            setPhone(user.phone || '');
        }
    }, [user]);


    useEffect(() => {
        if (isOpen) {
            setSuccess(false);
            setError('');
            if (user) {
                setName(user.firstName || '');
                setEmail(user.email || '');
                setPhone(user.phone || '');
            } else {
                setName('');
                setEmail('');
                setPhone('');
            }
            setSubject(vehicleName ? `Inquiry about ${vehicleName}` : '');
            setMessage('');
        }
    }, [isOpen, user, vehicleName]);


    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);


        const inquiryData = {
            name: name.trim(),
            email: email.toLowerCase().trim(),
            phone: phone ? phone.trim() : '',
            subject: subject.trim(),
            message: message.trim(),
            createdBy: user?._id || null // Will be null for anonymous users

        };

        try {
            const response = await axios.post(
                `https://back-end-edj4.onrender.com/api/v1/inqury`,
                inquiryData,
                { withCredentials: true }
            );

            setSuccess(true);

            // Reset form fields (except user info if logged in)
            if (!user) {
                setName('');
                setEmail('');
                setPhone('');
            }
            setSubject(vehicleName ? `Inquiry about ${vehicleName}` : '');
            setMessage('');


            setTimeout(() => {
                if (success) onClose();
            }, 3000);

        } catch (err) {
            console.error('Error submitting inquiry:', err);
            setError(err.response?.data?.message || 'Failed to submit inquiry');
        } finally {
            setLoading(false);
        }
    };

    // Don't render anything if modal is closed
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
            onClick={handleOutsideClick}
        >
            <div
                ref={modalRef}
                className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-y-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <IoMdClose className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">


                    {success && (
                        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
                            Thank you! Your inquiry has been submitted successfully We will contact soon.
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name*
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
                                    placeholder="Your name"
                                    required

                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address*
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
                                    placeholder="your.email@example.com"
                                    required

                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
                                    placeholder="(Optional)"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Subject*
                                </label>
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
                                    placeholder="Inquiry subject"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Message*
                            </label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
                                placeholder="Your inquiry or message..."
                                required
                            ></textarea>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-md font-medium transition-colors disabled:bg-indigo-400"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </div>
                                ) : 'Submit Inquiry'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactInquiryModal;