import React, { useEffect, useState } from 'react';

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/productos')
      .then(response => response.json())
      .then(data => setProductos(data));
  }, []);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    alert(`Agregado al carrito: ${producto.nombre}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Ferremas - Productos Disponibles</h1>
      <h2>Lista de Productos</h2>
      <ul>
        {productos.map(producto => (
          <li key={producto.id}>
            <strong>{producto.nombre}</strong> - {producto.categoria} - ${producto.precio}
            <button 
              style={{ marginLeft: '10px' }} 
              onClick={() => agregarAlCarrito(producto)}
            >
              Agregar al carrito
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;