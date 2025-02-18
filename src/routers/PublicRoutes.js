import React, { createContext, useContext } from 'react'
import { Navigate } from 'react-router';
import { AuthContext } from '../components/auth/AuthContext';


export const PublicRoutes = ({ children }) => {

    const { user } = useContext(AuthContext);

    const lastPath = localStorage.getItem( 'lastPath' ) || '/' ;

    if (user){
        return <Navigate to={lastPath}/>;
    }
  
  return children;
}
