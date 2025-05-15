import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetalleProducto.css';

const DetalleProducto = () => {
  const { id } = useParams(); // Captura el ID de la URL
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/productos/id/${id}`)
      .then(res => res.json())
      .then(data => setProducto(data))
      .catch(err => console.error('Error al obtener producto:', err));
  }, [id]);

  if (!producto) {
    return <div className="text-center mt-5 text-white">Cargando producto...</div>;
  }

  const imagenSrc = producto.imagenUrl?.startsWith('http')
    ? producto.imagenUrl
    : `/img/${producto.imagenUrl}`;

  const estiloFondo = {
    backgroundImage: 'url("/img/fondoferre.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    paddingTop: '20px',
    paddingBottom: '20px'
  };

  return (
    <div style={estiloFondo}>
      <div className="container mt-5">
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
            <img
              src={imagenSrc}
              alt={producto.nombre}
              className="imagen-detalle mt-3"
              style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
