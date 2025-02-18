import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import 'animate.css';


export const LoginScreen = () => {

  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.ui);

  const [ formValues, handleInputChange ] = useForm ({ 
    email: 'jonathan.quintana.caro@gmail.com',
    password: '321654',
   })

   const { email, password } = formValues;

   const handleLogin = (e) => {
    e.preventDefault();
    dispatch( startLoginEmailPassword(email, password ) );
   }

   const handleGoogleLogin = () => {
      dispatch( startGoogleLogin() );
   }

  return (
    <div className="animate__animated animate__fadeIn animate__faster" >
      <h3 className='auth__tittle' >Login</h3>

      <form onSubmit={ handleLogin }>

        <input
          type='text'
          placeholder='Email'
          name='email'
          className='auth__input'
          value={ email }
          onChange={ handleInputChange }
        />

        <input
          type='password'
          placeholder='Password'
          name='password'
          className='auth__input'
          value={ password }
          onChange={ handleInputChange }
        />

        <button
          type='submit'
          className='btn btn-primary btn-full'
          disabled={ loading }
          
          
        >
          Login
        </button>

        <div className='auth__social-networks' >
          <p>Login with Social Networks</p>

          <div
            className="google-btn"
            onClick={ handleGoogleLogin }
          >
            <div className="google-icon-wrapper">
              <img className="google-icon" src="https://cdn.icon-icons.com/icons2/729/PNG/256/google_icon-icons.com_62736.png" alt="google button" />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>

        </div>

        <Link
          to='/auth/register'
          className='link'
        >
          Create New Account
        </Link>

      </form>


    </div>
  )
}
