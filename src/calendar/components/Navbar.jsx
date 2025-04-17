//import { useLoginStore } from "../../auth/hooks/useLoginStore";
import { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';



export const Navbar = () => {

      const {logout} = useContext(AuthContext)
    
    const handleLogout = () => {
        logout();
    }


  return (
    <div className="navbar navbar-dark bg-dark-blue mb-4 px-4">
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt">
                &nbsp;
                 Leonardo
            </i>
        </span>
        <button 
            className="btn btn-outline-danger"
            onClick={handleLogout}
        >
            <i className="fas fa-sign-out-alt"></i>
            &nbsp;
            <span>Salir</span>
        </button>
    </div>
  )
}
