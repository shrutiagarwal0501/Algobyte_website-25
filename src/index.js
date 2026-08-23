import React from 'react';
import ReactDOM from 'react-dom/client';
import { appRouter } from './App';
import './styles/app.scss';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  </React.StrictMode>
);