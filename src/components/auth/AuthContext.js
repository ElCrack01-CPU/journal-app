import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';



// Creamos el contexto
export const AuthContext = createContext();

export const AuthProvider = ( { children } ) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true); // Para saber si estamos verificando el estado de autenticación
  const auth = getAuth();

  useEffect(() => {
    // Verificamos el estado de autenticación al montar el componente
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Si el usuario está autenticado, se guarda en el estado
      setChecking(false); // Ya terminamos de verificar
    });

    return () => unsubscribe(); // Limpiamos el efecto cuando el componente se desmonte
  }, []);

  if (checking) {
    return <div>Loading...</div>; // Puedes mostrar un spinner o mensaje mientras se verifica el estado
  }

  return (
    <AuthContext.Provider value={{ user }}>
        { children }      
    </AuthContext.Provider>
  );
};
