import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DetalleProducto = () => {
  const { id } = useParams(); // <-- Captura el ID de la URL
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/productos/id/${id}`) // <-- Cambiado aquí
      .then(res => res.json())
      .then(data => setProducto(data))
      .catch(err => console.error('Error al obtener producto:', err));
  }, [id]);

  if (!producto) {
    return <div className="text-center mt-5">Cargando producto...</div>;
  }

  // Ruta de imagen local o externa
  const imagenSrc = producto.imagenUrl?.startsWith('http')
    ? producto.imagenUrl
    : `/img/${producto.imagenUrl}`;

  return (
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
          <img src={imagenSrc} alt={producto.nombre} className="img-fluid rounded mt-3" />
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;