import React, { useEffect, useState } from 'react';

const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/productos')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error al obtener productos:', error));
  }, []);

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {productos.map(producto => (
          <li key={producto.id}>
            <strong>{producto.nombre}</strong> - {producto.categoria} - ${producto.precio}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Productos;
