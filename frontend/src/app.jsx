import React, { useEffect, useState } from "react";
import ProductoCard from "./components/ProductoCard";
import Carrito from "./components/Carrito";

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">🛒 Ferremas - Productos</h1>

      <div className="row">
        {productos.map((producto) => (
          <ProductoCard
            key={producto.id}
            producto={producto}
            onAgregar={agregarAlCarrito}
          />
        ))}
      </div>

      <hr className="my-4" />
      <Carrito carrito={carrito} />
    </div>
  );
}

export default App;

