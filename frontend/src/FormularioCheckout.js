import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormularioCheckout = () => {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    region: '',
    ciudad: '',
    codigoPostal: '',
    direccion: ''
  });

  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(formulario.nombre)) {
      nuevosErrores.nombre = 'Solo se permiten letras';
    }
    if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(formulario.apellido)) {
      nuevosErrores.apellido = 'Solo se permiten letras';
    }
    if (!/^[0-9]{7,15}$/.test(formulario.telefono)) {
      nuevosErrores.telefono = 'Número inválido';
    }
    if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(formulario.ciudad)) {
      nuevosErrores.ciudad = 'Solo se permiten letras';
    }
    if (!/^\d{4,10}$/.test(formulario.codigoPostal)) {
      nuevosErrores.codigoPostal = 'Código postal inválido';
    }
    if (formulario.direccion.trim() === '') {
      nuevosErrores.direccion = 'La dirección no puede estar vacía';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const cliente = { ...formulario };
    const productos = JSON.parse(localStorage.getItem('carrito')) || [];
    const total = productos.reduce((acc, p) => acc + (p.precio * (p.cantidad || 1)), 0);

    localStorage.setItem('cliente', JSON.stringify(cliente));

    try {
      const guardarRes = await fetch("http://localhost:8080/api/simular-pago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cliente, productos, total })
      });

      if (!guardarRes.ok) {
        throw new Error("❌ Error al guardar la orden y cliente.");
      }

      const items = productos.map(p => ({
        title: p.nombre,
        quantity: p.cantidad || 1,
        currency_id: "CLP",
        unit_price: p.precio
      }));

      const body = {
        items,
        payer: {
          name: cliente.nombre,
          surname: cliente.apellido,
          email: "test_user_863219767@testuser.com"
        },
        back_urls: {
          success: "https://www.success.com",
          failure: "https://www.failure.com",
          pending: "https://www.pending.com"
        },
        auto_return: "approved"
      };

      const res = await fetch("http://localhost:8080/api/mercadopago/crear-preferencia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (res.status === 403) {
        setMensaje("❌ Error de autenticación con Mercado Pago.");
        return;
      }

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        console.error("❌ Preferencia no generada:", data);
        setMensaje("❌ No se pudo generar la preferencia de pago.");
      }
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al procesar la compra.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>🧾 Formulario de Checkout</h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}

      <form onSubmit={manejarEnvio}>
        {['nombre', 'apellido', 'telefono', 'region', 'ciudad', 'codigoPostal', 'direccion'].map((campo) => (
          <div key={campo} className="mb-3">
            <label className="form-label">{campo.charAt(0).toUpperCase() + campo.slice(1)}</label>
            <input
              type={campo === 'telefono' || campo === 'codigoPostal' ? 'tel' : 'text'}
              name={campo}
              className="form-control"
              value={formulario[campo]}
              onChange={manejarCambio}
              required
            />
            {errores[campo] && <div className="text-danger">{errores[campo]}</div>}
          </div>
        ))}

        <button type="submit" className="btn btn-success w-100">Finalizar Compra</button>
      </form>
    </div>
  );
};

export default FormularioCheckout;
