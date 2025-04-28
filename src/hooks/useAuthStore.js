import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { onCheckingCredentials, onClearErrorMessage, onLogin, onLogout } from "../store/auth/authSlice";
import Swal from "sweetalert2";

export const useAuthStore = () => {

   const {status, user, errorMessage} = useSelector((state) => state.auth);
   const dispatch = useDispatch();

   const startLogin = async({email, password}) => {
        dispatch(onCheckingCredentials());

        try {
            const {data} = await calendarApi.post('/auth', {email, password});
            const { token, logeddUser} = data.data;
            const {name, _id:uid} = logeddUser;
            localStorage.setItem('token', token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name, uid}));
        } catch (error) {
            console.log(error);
            dispatch(onLogout('Invalid credentials'));
            setTimeout(() => {
                dispatch(onClearErrorMessage());
            }, 10);

        }
   }

   const startRegister = async({ name, email, password, password2}) => {

    try {
        const {data} = await calendarApi.post('/auth/register', { name, email, password, password2});
        const { token, createdUser} = data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('token-init-date', new Date().getTime());  
        dispatch(onLogin({name: createdUser.name, uid: createdUser._id}));
    } catch (error) {
        const message = error.response.data.message || 'PPPPP';
        //console.log(message);
        dispatch(onLogout(message));
        setTimeout(() => {
            dispatch(onClearErrorMessage());
        }, 10);
    }
   }


  return{

    //*Properties
    status, // 'checking', 'not-authenticated', 'authenticated'
    user, // {name: '', email: ''}
    errorMessage, // undefined | string

    //*Methods
    startLogin,
    startRegister,

  }

}