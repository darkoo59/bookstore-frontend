import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from 'react-auth-kit';
import { BrowserRouter } from 'react-router-dom';

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