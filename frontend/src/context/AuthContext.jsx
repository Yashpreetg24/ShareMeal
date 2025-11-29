import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on app start
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        } catch (error) {
            console.error('Error checking login status:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            // Basic validation
            if (!email || !password) {
                throw new Error('Email and password are required');
            }

            // For demo purposes, accept any email/password combination
            // In a real app, you would make an API call here
            const userData = {
                id: '1',
                name: email.split('@')[0] || 'User',
                email: email,
                phone: '+1 234 567 8900',
                location: 'New York, USA',
                donationsCount: 12,
                volunteerHours: 24,
            };

            // Store user data
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

