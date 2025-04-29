import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import {
  onCheckingCredentials,
  onClearErrorMessage,
  onLogin,
  onLogout,
} from "../store/auth/authSlice";
import Swal from "sweetalert2";
import { onLogoutCalendar } from "../store";

export const useAuthStore = () => {
  const { authStatus, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onCheckingCredentials());

    try {
      const { data } = await calendarApi.post("/auth", { email, password });
      const { token, logeddUser } = data.data;
      const { name, _id: uid } = logeddUser;
      localStorage.setItem("token", token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name, uid }));
    } catch (error) {
      console.log(error);
      dispatch(onLogout("Invalid credentials"));
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ name, email, password, password2 }) => {
    try {
      const { data } = await calendarApi.post("/auth/register", {
        name,
        email,
        password,
        password2,
      });
      const { token, createdUser } = data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: createdUser.name, uid: createdUser._id }));
    } catch (error) {
      const message = error.response.data.message || "Register Failed";
      //console.log(message);
      dispatch(onLogout(message));
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await calendarApi.get('/auth/renew-token');
      const { token, name, uid } = data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ name, uid }));
    } catch (error) {
      console.log(error);
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogoutCalendar());
    dispatch(onLogout());
  };

  return {
    //*Properties
    authStatus, // 'checking', 'not-authenticated', 'authenticated'
    user, // {name: '', email: ''}
    errorMessage, // undefined | string

    //*Methods
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
