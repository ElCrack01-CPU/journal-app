import React from 'react'
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppRouter } from './routers/AppRouter'
import { AuthProvider } from './components/auth/AuthContext';

export const JournalApp = () => {
  return (
    <Provider store={store} >
      <AuthProvider>
      <AppRouter />
      </AuthProvider>
    </Provider>

  )
}
