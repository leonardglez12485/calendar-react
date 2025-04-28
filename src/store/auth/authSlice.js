
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
        onLogout: (state, payload) => {
            state.authStatus = 'not-authenticated';
            state.user = {};
            state.errorMessage =  payload.payload ;     
        },
        onCheckingCredentials: (state) => {
            state.authStatus = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },
        onClearErrorMessage: (state) => {
            state.errorMessage = undefined;
        }

    }
    
})


export const { onLogin, onLogout, onCheckingCredentials, onClearErrorMessage } = authSlice.actions