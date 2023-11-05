import React from 'react'
import '../../css/Form.css';
import validateInfoLogin from '../helpers/valideInfoLogin';
import useFormLogin from '../hooks/useFormLogin';

const FormLogin = ( ) => {
    const { handleChange, values, handleSubmit, errors  } = useFormLogin( validateInfoLogin );
    return (
        <div className="form-content-right">

        <form className="form" onSubmit={handleSubmit}>
            <h1>Ingresa a tu cuenta </h1>
        
            <div className="form-inputs">
                <label htmlFor="email" 
                className="form-label">
                    Correo
                </label>
                <input
                    id="email"
                    type="email" 
                    name="email"
                    placeholder="Ingrese su correo electronico"
                    className="form-input"
                    value={values.email}
                    onChange={handleChange}
                />
                { errors.email && <p>{ errors.email }</p>}
            </div>
            <div className="form-inputs">
                <label htmlFor="password" 
                className="form-label">
                    Contraseña
                </label>
                <input
                    id="password"
                    type="password" 
                    name="password"
                    placeholder="Ingrese su contraseña"
                    className="form-input"
                    value={values.password}
                    onChange={handleChange}
                />
                { errors.password && <p>{ errors.password }</p>}
            </div>
            <button id="btn-login" type="submit" className="form-input-btn">Ingresar</button>
            <span className="form-input-login">¿Aun no tienes cuenta? Registrate <a href="/signup"> aqui</a></span>
            </form>      
        </div>
    );
}
    


export default FormLogin;
