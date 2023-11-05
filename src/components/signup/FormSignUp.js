import React, { useEffect, useState } from 'react';
import validateInfo from '../helpers/validateInfo';
import useForm from '../hooks/useForm';
import { decanaturaApiclient } from '../../services/decanaturaApiClient'

const FormSignUp = ( ) => {
    const inputs = ['carnet','email','password','password2', 'programa'];
    const { handleChange, values, handleSubmit, errors } = useForm( inputs, validateInfo );
    const [decanaturas, setDecanaturas] = useState([]);

    useEffect(() => {
        const list = [4,5,7];
        decanaturaApiclient.getDecanaturas()
            //Decanaturas filtrandolas con el id 4, 5, 7
            .then( ( response ) => {
                const dec = response.filter( d => {
                    return list.indexOf(d.id) !== -1;
                });
                setDecanaturas( dec );
            })
            .catch( (error) => console.log(error.message) );     
    }, []);
    
    return (
    <div className="form-content-right">
        <form className="form" onSubmit={handleSubmit}>
            <h1>Crea tu propia cuenta ingresando la info que se encuentra abajo</h1>
            <div className="form-inputs">
                <label htmlFor="carnet" 
                className="form-label">
                    Carnet
                </label>
                <input
                    id="carnet"
                    type="number" 
                    name="carnet"
                    placeholder="Ingrese su carnet estudiantil"
                    className="form-input"
                    value={values.carnet}
                    onChange={handleChange}
                />
                { errors.carnet && <p>{ errors.carnet }</p>}
            </div>
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
            <div className="form-inputs">
                <label htmlFor="password2" 
                className="form-label">
                    Confirmar contraseña
                </label>
                <input
                    id="password2"
                    type="password" 
                    name="password2"
                    placeholder="Confirme su contraseña"
                    className="form-input"
                    value={values.password2}
                    onChange={handleChange}
                />
                { errors.password2 && <p>{ errors.password2 }</p>}
            </div>
            <div className="form-inputs">
                <label htmlFor="programa" 
                className="form-label">
                    Programa Academico
                </label>
                <select 
                    id="programa"
                    name="programa"
                    className="form-input"
                    onChange={handleChange}
                    >
                        {  decanaturas.map( ({ id, nombre }) => {
                            return <option value={id} key={id}> { nombre } </option>;
                        })}
                </select>
                { errors.programa && <p>{ errors.programa }</p>}
                
            </div>
            <button id="btn-registrar" type="submit" className="form-input-btn">Registrar</button>
            <span className="form-input-login">¿Ya tienes cuenta? Ingresa  <a href="/login"> aqui</a></span>
        </form>      
    </div>
    )
}

export default FormSignUp;
