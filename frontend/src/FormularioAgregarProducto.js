import React, { useState, useEffect } from 'react';

const FormularioAgregarProducto = ({ onCerrar, onProductoAgregado, productoEditado }) => {
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    marca: '',
    stock: '',
    imagenUrl: ''
  });

  useEffect(() => {
    if (productoEditado) {
      setNuevoProducto(productoEditado);
    }
  }, [productoEditado]);

  const handleChange = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value
    });
  };

  const generarCodigo = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/productos');
      const productos = await res.json();
      const ultimo = productos.length > 0 ? productos[productos.length - 1].codigo : 'FER-000';
      const num = parseInt(ultimo.split('-')[1]) + 1;
      return `FER-${String(num).padStart(3, '0')}`;
    } catch (error) {
      console.error("❌ Error generando código:", error);
      return 'FER-001';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      let url = "http://localhost:8080/api/productos/agregar";
      let method = "POST";
      let mensaje = "✅ Producto guardado exitosamente";

      if (productoEditado) {
        url = `http://localhost:8080/api/productos/editar/${productoEditado.id}`;
        method = "PUT";
        mensaje = "✏️ Producto actualizado exitosamente";
      } else {
        const codigoGenerado = await generarCodigo();
        nuevoProducto.codigo = codigoGenerado;
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(nuevoProducto)
      });

      if (res.ok) {
        const productoFinal = await res.json();
        alert(mensaje);
        onProductoAgregado(productoFinal);
        onCerrar();
      } else {
        alert("❌ Error al guardar el producto");
      }
    } catch (err) {
      console.error("❌ Error de red:", err);
      alert("❌ Error al conectar con el servidor");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content card p-4">
        <h4>{productoEditado ? "Editar Producto" : "Añadir Producto"}</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label>Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={nuevoProducto.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label>Descripción</label>
            <textarea
              className="form-control"
              name="descripcion"
              rows={3}
              value={nuevoProducto.descripcion}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-2">
            <label>Precio</label>
            <input
              type="number"
              className="form-control"
              name="precio"
              value={nuevoProducto.precio}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label>Categoría</label>
            <input
              type="text"
              className="form-control"
              name="categoria"
              value={nuevoProducto.categoria}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label>Marca</label>
            <input
              type="text"
              className="form-control"
              name="marca"
              value={nuevoProducto.marca}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label>Stock</label>
            <input
              type="number"
              className="form-control"
              name="stock"
              value={nuevoProducto.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>URL de la imagen</label>
            <input
              type="text"
              className="form-control"
              name="imagenUrl"
              value={nuevoProducto.imagenUrl}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success">
              {productoEditado ? "Actualizar" : "Guardar"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCerrar}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioAgregarProducto;
