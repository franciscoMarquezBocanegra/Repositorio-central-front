const validateInfo = values => {
    const errors = {};
    const { carnet, email, password, password2, programa } = values;
    const regularExp = /^[-\w.%+]{1,64}@(?:mail\.)*escuelaing.edu.co$/i;
    //Carnet
    if (!carnet.trim()) errors.carnet = 'Carnet obligatorio';
    if (parseInt(carnet) <= 0) errors.carnet = 'Carnet invalido';

    //Email
    if (!email) errors.email = 'Correo obligatorio';
    else if (!regularExp.test(email))
        errors.email =
            'Correo invalido, el correo no tiene el dominio .escuelaing.edu.co o no es un correo valido';

    //Passwd
    if (password.length < 5)
        errors.password = 'Contraseña debe ser minimo de 5 caracteres';
    if (!password) errors.password = 'Contraseña obligatoria';
    if (!password2) errors.password2 = 'Contraseña obligatoria';

    if (password !== password2)
        errors.password2 = 'Las contraseñas deben coincidir';
    if (!programa) errors.programa = 'Programa obligatorio';

    return errors;
};

export default validateInfo;
