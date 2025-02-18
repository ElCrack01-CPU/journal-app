import React, { useContext } from 'react'
import { Navigate } from 'react-router';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthContext } from '../components/auth/AuthContext';
import { AuthRouter } from './AuthRouter';


export const PrivateRoute = ( { children } ) => {
    const { user } = useContext(AuthContext);
 
    if ( !user ){
        return <Navigate to='/auth/login' replace />;
    }
  
  return children;
}
