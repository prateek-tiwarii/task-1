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
    const isUser = !!user; // Boolean flag to check if user is authenticated

    // Login function to authenticate user
    const login = async ({ email, password }) => {
        console.log('Login Attempt:', email, password);
        setLoading(true);

        try {
            const url = 'http://localhost:8080/api/user/login'; // Your login endpoint

            // Make the login request
            const res = await axios.post(url, { email, password });

            if (res.data.success) {

                toast.success('Login successful');
                // Store the token in Cookies (you can also use localStorage if preferred)
                Cookies.set('token', res.data.token, { expires: 7 });
                return res.data; // Return response to handle in Login componen
            } else {
                // Handle specific error messages
                toast.error(res.data.message || 'Login failed');
                return res.data;
            }
        } catch (error) {
            console.error('Login Error:', error);
            toast.error('Something went wrong, please try again.');
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    // Logout function to clear user data and cookies
    const logout = () => {
        console.log('Logging out');
        setUser(null);
        Cookies.remove('token'); // Remove token from cookies
        toast.success('Logged out successfully');
        window.location.replace('/'); // Redirect to login page
    };

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUser = async () => {

            const token = Cookies.get('token');
            console.log(token);
            if (token) {
                setLoading(true);
                try {

                    const res = await axios.post('https://task-1-cwnabbiy5-tomioka-senseis-projects.vercel.app/api/auth/verify', { token });
                    console.log(res);
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
            {children} {/* Render children components */}
        </UserContext.Provider>
    );
};


