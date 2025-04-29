
import { FaKey } from 'react-icons/fa';
import './LoginPage.css';
import { useAuthStore, useForm } from '../../hooks';
import { useEffect } from 'react';
import Swal from 'sweetalert2';


const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
}
const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: ''
}

export const LoginPage = () => {

    const { startLogin, startRegister, errorMessage} = useAuthStore();

    const {loginEmail, loginPassword, onInputChange: onLoginInpuntChange} = useForm(loginFormFields);
    const {registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInpuntChange} = useForm(registerFormFields);

   const handleLogin = (e) => {
        e.preventDefault();
        startLogin({email: loginEmail, password: loginPassword});
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if (registerPassword !== registerPassword2) {
            Swal.fire({
                icon: 'error',
                title: 'Register Error',
                text: 'Passwords do not match',
                confirmButtonText: 'Ok'
            });
            return;
        }
        if (registerName.length < 1) {
            Swal.fire({
                icon: 'error',
                title: 'Register Error',
                text: 'Name is required',
                confirmButtonText: 'Ok'
            });
            return;
        }
        if (registerEmail.length < 1) {
            Swal.fire({
                icon: 'error',
                title: 'Register Error',
                text: 'Email is required',
                confirmButtonText: 'Ok'
            });
            return;
        }
        startRegister({name: registerName, email: registerEmail, password: registerPassword, password2: registerPassword2});
       // console.log('Register:', registerName, registerEmail, registerPassword, registerPassword2);
    }

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire({
                icon: 'error',
                title: 'Authentication Error',
                text: errorMessage,
                confirmButtonText: 'Ok'
            });
        }
    }, [errorMessage])
    


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Acces  <FaKey style={{ color: '#6c757d' }} /> </h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Em@il"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={onLoginInpuntChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={onLoginInpuntChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Register</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="registerName"
                                value={registerName}
                                onChange={onRegisterInpuntChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Em@il"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={onRegisterInpuntChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="registerPassword"
                                value={registerPassword}
                                onChange={onRegisterInpuntChange} 
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repeat Password"
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={onRegisterInpuntChange} 
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Create an Account" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}