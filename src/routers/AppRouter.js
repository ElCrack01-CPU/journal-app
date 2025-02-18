import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import { AuthContext } from '../components/auth/AuthContext';
import { startLoaddingNote } from '../actions/notes';

export const AppRouter = () => {

  const { user } = useContext(AuthContext);
  const auth = getAuth();
  const dispatch = useDispatch();


  useEffect(() => {

    onAuthStateChanged(auth, async (user) => {

      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        dispatch( startLoaddingNote( user.uid ) );    
      }

    })

  }, [dispatch])

  return (
    <Router>
      <Routes>

        <Route path="/auth/*" element={<PublicRoutes> <AuthRouter /> </PublicRoutes>} />

        <Route path="/" element={<PrivateRoute > <JournalScreen /> </PrivateRoute>} />

        <Route path="/*" element={<Navigate to="/auth/login" replace />} />

      </Routes>
    </Router>

  );
}
