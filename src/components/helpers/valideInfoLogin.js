const validateInfoLogin = values => {
    const errors = {};
    const { email, password } = values;
    const regularExp = /^[-\w.%+]{1,64}@(?:mail\.)*escuelaing.edu.co$/i;
    
    //email
    if( !email ) errors.email = "Correo obligatorio";
    else if ( !regularExp.test(email) ) errors.email = "Correo invalido, el correo no tiene el dominio .escuelaing.edu.co o no es un correo valido";
    
    //password
    if ( !password ) errors.password = "Contraseña obligatoria";
    
    return errors;
}

export default validateInfoLogin;