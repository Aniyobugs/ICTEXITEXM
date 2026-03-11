import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../components/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const res = await api.get('/api/auth/me');
            setUser(res.data.user);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = (userData) => {
        setUser(userData);
    };

    const logout = async () => {
        try {
            await api.post('/api/auth/logout');
            setUser(null);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return null; // Or a loading spinner

    return (
        <AuthContext.Provider value={{ user, login, logout, checkUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
