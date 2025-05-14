
import React from 'react';

const Carrito = ({ carrito }) => {
  const total = carrito.reduce((sum, item) => sum + item.precio, 0);

  return (
    <div>
      <h2>🧺 Carrito ({carrito.length} productos)</h2>
      <ul className="list-group">
        {carrito.map((item, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between">
            <span>{item.nombre}</span>
            <span>${item.precio}</span>
          </li>
        ))}
      </ul>
      <h4 className="mt-3">Total: ${total.toFixed(2)}</h4>
    </div>
  );
};

export default Carrito;



