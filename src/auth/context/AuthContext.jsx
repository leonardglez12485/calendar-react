import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authStatus, setAuthStatus] = useState('not-authenticated'); // Estado inicial

    const login = () => {
        setAuthStatus('authenticated'); // Cambia el estado a autenticado
    };

    const logout = () => {
        setAuthStatus('not-authenticated'); // Cambia el estado a no autenticado
    };

    return (
        <AuthContext.Provider value={{ authStatus, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};