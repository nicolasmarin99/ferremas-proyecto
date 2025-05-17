import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
  const fetchProducto = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = token
  ? { "Authorization": `Bearer ${token}` }
  : {}; // Si no hay token, no se manda nada

const res = await fetch(`http://localhost:8080/api/productos/${id}`, {
  headers
});

      if (!res.ok) {
        throw new Error(`Error HTTP ${res.status}`);
      }

      const data = await res.json();
      setProducto(data);
    } catch (error) {
      console.error('Error al obtener producto:', error);
    }
  };

  fetchProducto();
}, [id]);

  const agregarAlCarrito = () => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoActual.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carritoActual));
    alert("✅ Producto agregado al carrito");
    navigate("/carrito");
  };

  if (!producto) {
    return <div className="text-center mt-5">Cargando producto...</div>;
  }

  const imagenSrc = producto.imagenUrl?.startsWith("http")
    ? producto.imagenUrl
    : `/img/${producto.imagenUrl}`;

  const estiloFondo = {
    backgroundImage: 'url("/img/fondoferre.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    paddingTop: '40px',
    paddingBottom: '40px'
  };

  return (
    <div style={estiloFondo}>
      <div className="container">
        <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
          ← Volver
        </button>

        <div className="card bg-dark text-white shadow">
          <div className="card-body">
            <h3 className="card-title">{producto.nombre}</h3>
            <p className="card-text"><strong>Categoría:</strong> {producto.categoria}</p>
            <p className="card-text"><strong>Precio:</strong> ${producto.precio}</p>
            <p className="card-text"><strong>Stock:</strong> {producto.stock}</p>
            <p className="card-text"><strong>Marca:</strong> {producto.marca}</p>
            <p className="card-text"><strong>Descripción:</strong> {producto.descripcion}</p>
            <img src={imagenSrc} alt={producto.nombre} className="img-fluid rounded mt-3" style={{ maxHeight: '300px', objectFit: 'cover' }} />
            <button className="btn btn-success mt-4 w-100" onClick={agregarAlCarrito}>
              🛒 Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;