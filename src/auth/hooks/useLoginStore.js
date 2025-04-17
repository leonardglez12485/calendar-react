import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../store/auth/authSlice";


export const useLoginStore = () => {
    const dispatch = useDispatch();
    const { authStatus, user, errorMessage } = useSelector((state) => state.auth);
    
    const startLogin = async () => {
       dispatch(login());
    }

    const startLogout = async () => {
        dispatch(logout());
    }

    return {
        //*Properties
        authStatus,
        user,
        errorMessage,

        //*Methods
        startLogin,
        startLogout,
    }
}