
import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authStatus: 'not-authenticated', // 'authenticated', 'not-authenticated'
        user: {},
        errorMessage: undefined,
    },
    reducers: {
        onLogin: (state, {payload}) => {
            state.authStatus = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state) => {
            state.authStatus = 'not-authenticated';
        },
        onCheckingCredentials: (state) => {
            state.authStatus = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        }
    }
    
})


export const { onLogin, onLogout, onCheckingCredentials } = authSlice.actions