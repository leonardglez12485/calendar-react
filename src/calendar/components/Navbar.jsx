
export const Navbar = () => {
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
            onClick={() => console.log('Logout')}
        >
            <i className="fas fa-sign-out-alt"></i>
            &nbsp;
            <span>Salir</span>
        </button>
    </div>
  )
}
