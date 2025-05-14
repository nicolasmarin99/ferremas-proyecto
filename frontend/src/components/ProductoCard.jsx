import React from 'react';

const ProductoCard = ({ producto, onAgregar }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow">
        <img
          src={`/img/${producto.imagenUrl}`}
          className="card-img-top"
          alt={producto.nombre}
          style={{ height: "180px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text">
            <strong>Categoría:</strong> {producto.categoria} <br />
            <strong>Stock:</strong> {producto.stock} <br />
            <strong>Precio:</strong> ${producto.precio}
          </p>
          <button
            className="btn btn-primary w-100"
            onClick={() => onAgregar(producto)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoCard;

