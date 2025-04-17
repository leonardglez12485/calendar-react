import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useContext } from 'react';
import { AuthContext } from '../auth/context/AuthContext';


export const AppRouter = () => {

   const { authStatus } = useContext(AuthContext); 
    //const authStatus = 'not-authenticated';  // 'not-authenticated' | 'authenticated'

  return (
    <Routes>
          {
            (authStatus === 'not-authenticated')
            ? <Route path="/auth/*" element={<LoginPage />} />
            : <Route path="/*" element={<CalendarPage />} />
          }

        <Route path="/*" element={<Navigate to={"/auth/login"} />} />
    </Routes>
  )
}
