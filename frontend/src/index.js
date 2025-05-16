import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DetalleProducto from './DetalleProducto'; // ✅ Nuevo componente
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Carrito from './Carrito';
import FormularioCheckout from './FormularioCheckout';
import ResumenCompra from './ResumenCompra';
import Login from './Login'; // ✅ Agrega esta línea

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/carrito" element={<Carrito />} /> 
        <Route path="/checkout" element={<FormularioCheckout />} />
        <Route path="/resumen" element={<ResumenCompra />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
