import React, { useEffect, useState } from "react";

function App() {
const [productos, setProductos] = useState([]);
const [carrito, setCarrito] = useState([]);

  // Cargar productos desde el backend
useEffect(() => {
    fetch("http://localhost:8080/api/productos")
    .then((res) => res.json())
    .then((data) => setProductos(data))
    .catch((err) => console.error("Error al cargar productos:", err));
}, []);

  // Agregar producto al carrito
const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
};

return (
    <div style={{ padding: "1rem", fontFamily: "Arial" }}>
    <h1>Productos Ferremas</h1>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {productos.map((producto) => (
        <div
            key={producto.id}
            style={{
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "5px",
            width: "250px"
            }}
        >
            <h3>{producto.nombre}</h3>
            <p><strong>Precio:</strong> ${producto.precio}</p>
            <p><strong>Stock:</strong> {producto.stock}</p>
            <p><strong>Categoría:</strong> {producto.categoria}</p>
            <button onClick={() => agregarAlCarrito(producto)}>
            Agregar al carrito
            </button>
        </div>
        ))}
    </div>

    <hr style={{ margin: "2rem 0" }} />
    <h2>Carrito ({carrito.length} productos)</h2>
    <ul>
        {carrito.map((item, index) => (
        <li key={index}>{item.nombre} - ${item.precio}</li>
        ))}
    </ul>
    </div>
);
}

export default App;