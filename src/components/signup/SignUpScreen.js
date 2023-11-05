import React from 'react'
import FormSignUp from './FormSignUp';


const SignUpScreen = () => {
    return (
        <>
        <div className='form-container'>
          <div className='form-content-left'>
            <img className='form-img' src='img/img-2.svg' alt='spaceship' />
          </div>
          
          <FormSignUp />
          
        </div>
      </>
    );
};

export default SignUpScreen;
