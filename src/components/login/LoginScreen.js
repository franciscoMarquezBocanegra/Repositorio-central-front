import React from 'react';
import FormLogin from './FormLogin';

const LoginScreen = () => {
    return (
        <>
            <div className="form-container">
                <div className="form-content-left">
                    <img
                        className="form-img"
                        src="img/img-2.svg"
                        alt="spaceship"
                    />
                </div>

                <FormLogin />
            </div>
        </>
    );
};

export default LoginScreen;
