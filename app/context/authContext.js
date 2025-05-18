"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, use } from 'react';
import axios from 'axios';

// Create context with default values to avoid "undefined" errors
const AuthContext = createContext({
    user: null,
    loading: false,
    error: '',
    signup: async () => ({}),
    logout: () => { },
    isAuthenticated: false
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [updater, setUpdater] = useState(null)
    // Use effect with safeguards for client-side execution
    useEffect(() => {
        // Make sure we're on the client side
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (e) {
            console.error('Error loading stored user', e);
            localStorage.removeItem('user');
        }
    }, [updater]);

    const signup = useCallback(async (firstName, email, password) => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`https://back-end-edj4.onrender.com/api/v1/signup`, {
                firstName,
                email,
                password
            }, { withCredentials: true });

            const userData = response.data;
            setUser(userData);
            // Only try to use localStorage on client side
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(userData));
            }

            setLoading(false);
            return { success: true, data: userData };
        } catch (error) {
            console.error('Signup error:', error);
            setLoading(false);

            const errorMessage = error.response?.data?.message || 'Failed to create account';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    }, []);


    const logout = useCallback(() => {
        setUser(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
        }
        setUpdater(Date.now());
    }, []);

    const login = useCallback(async (email, password) => {
        setLoading(true);
        setError('');
        console.log(email, password);

        try {
            const response = await axios.post(`https://back-end-edj4.onrender.com/api/v1/login`, {
                email,
                password
            }, { withCredentials: true });

            const userData = response.data;
            setUser(userData);

            // Store user data in localStorage (client-side only)
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(userData));
            }

            setLoading(false);
            setUpdater(Date.now()); // Trigger UI update
            return { success: true, data: userData };
        } catch (error) {
            console.error('Login error:', error);
            setLoading(false);

            // Handle specific error responses
            const errorMessage = error.response?.data?.message || 'Invalid email or password';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    }, []);

    // Prepare the context value
    const contextValue = {
        user,
        loading,
        error,
        signup,
        login,
        logout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;