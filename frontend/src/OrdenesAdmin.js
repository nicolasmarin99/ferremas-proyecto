import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 importar

const OrdenesAdmin = () => {
  const [ordenes, setOrdenes] = useState([]);
  const navigate = useNavigate(); // 👈 inicializar

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch('http://localhost:8080/api/ordenes', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("❌ No autorizado");
        }
        return res.json();
      })
      .then(data => setOrdenes(data))
      .catch(err => {
        console.error("❌ Error cargando las órdenes:", err);
        alert("No tienes permiso para ver las órdenes");
      });
  }, []);

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-3" onClick={() => navigate('/')}>
        ← Volver al inicio
      </button>

      <h2>📋 Órdenes Registradas</h2>

      {ordenes.length === 0 ? (
        <p>No hay órdenes registradas.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Usuario</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden) => (
              <tr key={orden.id}>
                <td>{orden.id}</td>
                <td>{orden.estado}</td>
                <td>{new Date(orden.fecha).toLocaleString()}</td>
                <td>${orden.total.toLocaleString()}</td>
                <td>{orden.usuario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdenesAdmin;
