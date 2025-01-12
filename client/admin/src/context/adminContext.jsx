
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast from 'react-hot-toast';

// Create the UserContext
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// UserProvider component to wrap around your application
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const isUser = !!user;

    /**
     * Login function to authenticate admin users
     * @param {Object} param0 - Contains email and password
     * @returns {Object} - Response from the server
     */
    const login = async ({ email, password }) => {
        console.log('Login Attempt:', email, password);
        setLoading(true);
        try {
            // API endpoint for admin login
            const url = 'https://task-1-e1d9.onrender.com/api/admin/login';

            // Make the login request
            const res = await axios.post(url, { email, password });

            // Handle the response
            if (res.data.success) {
                toast.success('Login successful');
                // Store the token in Cookies (you can also use localStorage if preferred)
                Cookies.set('token', res.data.token, { expires: 7 });
                return res.data; // Return response to handle in Login component
            } else {
                // Handle specific statuses or messages
                if (res.data.status === 402) {
                    toast.error(res.data.message);
                } else {
                    toast.error(res.data.message || 'Login failed');
                }
                return res.data; // Return response
            }
        } catch (error) {
            console.error('Login Error:', error);
            toast.error('Something went wrong, please try again.');
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Logout function to clear user data and tokens
     */
    const logout = () => {
        console.log('Logging out');
        setUser(null);
        Cookies.remove('token');
        toast.success('Logged out successfully');
        // Redirect to the login page
        window.location.replace('/');
    };

    /**
     * Fetch user data on component mount to verify token and retrieve user info
     */
    useEffect(() => {
        const fetchUser = async () => {

            const token = Cookies.get('token');
            if (token) {
                setLoading(true);
                try {

                    const res = await axios.post('https://task-1-e1d9.onrender.com/api/auth/verify', { token });

                    if (res.data.success) {
                        setUser(res.data.user);
                    } else {

                        logout();
                    }
                } catch (error) {
                    console.error('Fetch User Error:', error);
                    logout();
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ isUser, loading, user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};