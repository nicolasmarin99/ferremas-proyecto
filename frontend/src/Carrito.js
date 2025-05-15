import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Carrito = () => {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);

  // Leer desde localStorage al cargar la página
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  const eliminarProducto = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-3" onClick={() => navigate('/')}>
        ← Volver
      </button>

      <h2 className="mb-4">🧺 Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {carrito.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  {item.nombre} - ${item.precio}
                </span>
                <button className="btn btn-danger btn-sm" onClick={() => eliminarProducto(index)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>

          <h4>Total: ${total.toLocaleString()}</h4>
        </>
      )}
    </div>
  );
};

export default Carrito;

