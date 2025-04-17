import React from 'react'
import { AppRouter } from './router'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { AuthProvider } from './auth/context/AuthContext'


export const CalendarApp = () => {
  return (
    <Provider store={store}>
    <AuthProvider>
    <BrowserRouter  future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}>
    <AppRouter />
    </BrowserRouter>
    </AuthProvider>
    </Provider>
  )
}
