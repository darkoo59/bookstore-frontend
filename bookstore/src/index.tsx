import React from 'react';
import { AuthProvider } from 'react-auth-kit';
import ReactDOM from 'react-dom/client';
import App from './App';
import './auth/axiosConfig';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider
      authType={"cookie"}
      authName={"accessToken"}
      cookieDomain={window.location.hostname}
      cookieSecure={false}>
    <App />
    </AuthProvider>
  </React.StrictMode>
);