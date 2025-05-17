import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResumenCompra = () => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("Procesando compra...");

  useEffect(() => {
    const cliente = JSON.parse(localStorage.getItem("cliente"));
    const productos = JSON.parse(localStorage.getItem("carrito"));

    if (!cliente || !productos || productos.length === 0) {
      setMensaje("❌ Datos incompletos para guardar la compra.");
      return;
    }

    const total = productos.reduce((acc, p) => acc + p.precio, 0);

    fetch("http://localhost:8080/api/simular-pago", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cliente, productos, total })
    })
      .then(res => res.json())
      .then(data => {
        console.log("✅ Respuesta del backend:", data);
        setMensaje("✅ Compra registrada exitosamente.");
        localStorage.removeItem("carrito");
        localStorage.removeItem("cliente");
      })
      .catch(err => {
        console.error("❌ Error al guardar la compra:", err);
        setMensaje("❌ Error al registrar la compra.");
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>🧾 Resumen de Compra</h2>
      <p>{mensaje}</p>
      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Volver al inicio
      </button>
    </div>
  );
};

export default ResumenCompra;
