import { useLocation } from 'react-router-dom';

const ResumenCompra = () => {
  const { state } = useLocation();
  const { cliente, productos, total } = state || {};

  if (!cliente || !productos) return <div>No hay datos de compra.</div>;

  return (
    <div className="container mt-4">
      <h2>✅ Resumen de tu compra</h2>
      <p><strong>Cliente:</strong> {cliente.nombre} {cliente.apellido}</p>
      <p><strong>Dirección:</strong> {cliente.direccion}, {cliente.ciudad}</p>
      <h4>Productos:</h4>
      <ul>
        {productos.map((p, i) => (
          <li key={i}>{p.nombre} - ${p.precio}</li>
        ))}
      </ul>
      <h5>Total: ${total}</h5>
    </div>
  );
};

export default ResumenCompra;
