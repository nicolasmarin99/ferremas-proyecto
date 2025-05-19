import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Carrito = () => {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);

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

  const actualizarCantidad = (index, cantidad) => {
    const nuevoCarrito = [...carrito];
    const producto = nuevoCarrito[index];

    if (cantidad > producto.stock) {
      alert(`❌ No puedes agregar más unidades de las disponibles (${producto.stock})`);
      return;
    }

    producto.cantidad = cantidad;
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const total = carrito.reduce((acc, item) => acc + item.precio * (item.cantidad || 1), 0);

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-3" onClick={() => navigate('/')}>← Volver</button>
      <h2 className="mb-4">🧺 Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {carrito.map((item, index) => (
              <li key={index} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{item.nombre}</strong><br />
                    Precio: ${item.precio} x 
                    <input
                      type="number"
                      min="1"
                      max={item.stock}
                      value={item.cantidad || 1}
                      onChange={(e) => actualizarCantidad(index, parseInt(e.target.value))}
                      style={{ width: "60px", margin: "0 10px" }}
                    /> = ${item.precio * (item.cantidad || 1)}
                    <div className="text-muted">Stock disponible: {item.stock}</div>
                  </div>
                  <button className="btn btn-danger btn-sm" onClick={() => eliminarProducto(index)}>
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <h4>Total: ${total.toLocaleString()}</h4>
          <button className="btn btn-success mt-3" onClick={() => navigate('/checkout')}>
            Finalizar compra
          </button>
        </>
      )}
    </div>
  );
};

export default Carrito;
