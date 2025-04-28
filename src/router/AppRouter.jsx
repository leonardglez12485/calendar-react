import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';


export const AppRouter = () => {

    const {checkAuthToken, authStatus} = useAuthStore();

    useEffect(() => {
      checkAuthToken();
    }, [])
    

    if (authStatus === 'checking') {
        return (
            <h5>Loading...</h5>
        )
    }


  return (
    <Routes>
          {
            (authStatus === 'not-authenticated')
            ? (
                <>
                    <Route path="/auth/*" element={<LoginPage />} />
                    <Route path="/*" element={<Navigate to={"/auth/login"} />} />
                </>
            )
            : 
            (
                <>
                    <Route path="/" element={<CalendarPage />} />
                    <Route path="/*" element={<Navigate to={"/"} />} />
                </>
            )
          }
    </Routes>
  )
}
