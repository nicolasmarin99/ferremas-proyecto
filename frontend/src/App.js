import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container mt-4">
      <h1 className="text-center mb-4">🛒 Ferremas - Productos Disponibles</h1>

      <div className="row">
        {productos.map(producto => (
          <div className="col-md-4 mb-4" key={producto.id}>
            <div className="card h-100 shadow-sm">
              <img 
                src="https://via.placeholder.com/300x180.png?text=Producto" 
                className="card-img-top" 
                alt={producto.nombre} 
              />
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">
                  <strong>Categoría:</strong> {producto.categoria} <br />
                  <strong>Precio:</strong> ${producto.precio}
                </p>
                <button 
                  className="btn btn-primary w-100"
                  onClick={() => agregarAlCarrito(producto)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-4" />
      <h2>🧺 Carrito ({carrito.length})</h2>
      <ul className="list-group">
        {carrito.map((item, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between">
            <span>{item.nombre}</span>
            <span>${item.precio}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
