import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

  const dispatch = useDispatch();
  const { msgError } = useSelector(state => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: 'Jonathan',
    email: 'jonathan.quintana.caro@gmail.com',
    password: '321654',
    confirm_p: '321654'
  })

  const { name, email, password, confirm_p } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch ( startRegisterWithEmailPasswordName (name, email, password));

    }

  }

  const isFormValid = () => {

    if (name.trim().length === 0) {
      dispatch(setError('Name is required'));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError('Email is not valid'));
      return false;
    } else if (password !== confirm_p || password.length < 6) {
      dispatch(setError('Password should be at least 6 characters and match each other'));
      return false;
    }
    dispatch(removeError());

    return true;
  }




  return (
    <div className="animate__animated animate__fadeIn animate__faster" >
      <h3 className='auth__tittle' >Register</h3>

      <form onSubmit={handleRegister} >

        {
          msgError &&
          <div className='auth__alert-error'>
            {msgError}
          </div>
        }

        <input
          type='text'
          placeholder='Name'
          name='name'
          className='auth__input'
          value={name}
          onChange={handleInputChange}
        />

        <input
          type='text'
          placeholder='Email'
          name='email'
          className='auth__input'
          value={email}
          onChange={handleInputChange}
        />

        <input
          type='password'
          placeholder='Password'
          name='password'
          className='auth__input'
          value={password}
          onChange={handleInputChange}
        />
        <input
          type='password'
          placeholder='Confirm Password'
          name='confirm_p'
          className='auth__input'
          value={confirm_p}
          onChange={handleInputChange}
        />

        <button
          type='submit'
          className='btn btn-primary btn-full mb-5'

        >
          Register
        </button>



        <Link
          to='/auth/login'
          className='link'
        >
          Already registered?
        </Link>

      </form>


    </div>
  )
}