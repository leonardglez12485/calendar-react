
import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authStatus: 'not-authenticated', // 'authenticated', 'not-authenticated'
        user: null,
        errorMessage: '',
    },
    reducers: {
        login: (state) => {
            state.authStatus = 'authenticated';
        },
        logout: (state) => {
            state.authStatus = 'not-authenticated';
        },
        checkingCredentials: (state) => {
            state.authStatus = 'checking';
        }
    }
    
})


export const { login, logout, checkingCredentials } = authSlice.actions