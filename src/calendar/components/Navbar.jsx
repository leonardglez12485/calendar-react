
import { AuthContext } from '../../auth/context/AuthContext';
import { useAuthStore } from '../../hooks/useAuthStore';



export const Navbar = () => {
 
  const { startLogout, user } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark-blue mb-4 px-4">
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt">
                &nbsp;
                 {user.name}
            </i>
        </span>
        <button 
            className="btn btn-outline-danger"
            onClick={startLogout}
        >
            <i className="fas fa-sign-out-alt"></i>
            &nbsp;
            <span>Salir</span>
        </button>
    </div>
  )
}
