import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { ThemeProvider } from "./context/theme-context";

// -- classes for bootstrap -- //
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AuthProvider } from './context/AuthContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
  <ThemeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
  </AuthProvider>
);