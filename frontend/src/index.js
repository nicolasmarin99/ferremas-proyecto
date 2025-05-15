import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App'; // Importa App.js
import 'bootstrap/dist/js/bootstrap.bundle.min';

// ✅ Importa Bootstrap aquí:
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Opcional: performance
reportWebVitals();
