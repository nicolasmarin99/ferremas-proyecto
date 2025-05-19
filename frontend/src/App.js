import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './Login';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import FormularioAgregarProducto from './FormularioAgregarProducto';

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [dolar, setDolar] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [mostrarUSD, setMostrarUSD] = useState({});
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEnEdicion, setProductoEnEdicion] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/productos')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error al cargar productos:', error));

    fetch('https://mindicador.cl/api/dolar')
      .then(res => res.json())
      .then(data => {
        const valorDolar = data.serie[0].valor;
        setDolar(valorDolar);
      })
      .catch(error => console.error('Error al obtener el valor del dólar:', error));
  }, []);

  const abrirFormularioEdicion = (producto) => {
  setProductoEnEdicion(producto);
  setMostrarFormulario(true);
};

  const agregarAlCarrito = (producto) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoActual.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carritoActual));
    setCarrito(carritoActual);
    alert(`✅ ${producto.nombre} agregado al carrito`);
  };

  const eliminarProducto = async (id) => {
  if (!window.confirm("¿Estás seguro de que deseas eliminar este producto?")) return;

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:8080/api/productos/eliminar/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.ok) {
      alert("🗑️ Producto eliminado");
      setProductos(productos.filter(p => p.id !== id));
    } else {
      alert("❌ Error al eliminar el producto");
    }
  } catch (error) {
    console.error("❌ Error al eliminar:", error);
    alert("❌ Error de red al eliminar producto");
  }
};


  const handleBusquedaChange = (e) => setBusqueda(e.target.value);

  const toggleMostrarUSD = (id) => {
    setMostrarUSD(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const productosFiltrados = productos.filter(producto =>
  producto && producto.nombre && producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
);
  const estiloFondo = {
    backgroundImage: 'url("/img/fondoferre.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    paddingTop: '20px',
    paddingBottom: '20px'
  };

  const rol = localStorage.getItem('rol');

  return (
    <div style={estiloFondo}>
      <div className="container mt-4">
        <nav className="navbar navbar-expand-lg bg-body-tertiary mb-4 border rounded shadow-sm px-3">
          <div className="container-fluid">
            <Link className="navbar-brand" to="#">Ferremas</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">Catálogo</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/carrito">Carrito</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Iniciar sesión</Link>
                </li>
              </ul>
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Buscar" value={busqueda} onChange={handleBusquedaChange} />
                <button className="btn btn-outline-success" type="submit">Buscar</button>
              </form>
            </div>
          </div>
        </nav>

        {rol === 'ADMINISTRADOR' && (
          <div className="mb-3 text-end">
            <button className="btn btn-success" onClick={() => setMostrarFormulario(true)}>
              ➕ Añadir producto
            </button>
          </div>
        )}

        {mostrarFormulario && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Añadir Nuevo Producto</h5>
                  <button type="button" className="btn-close" onClick={() => setMostrarFormulario(false)}></button>
                </div>
                <div className="modal-body">
                  <FormularioAgregarProducto
  productoEditado={productoEnEdicion}
  onProductoAgregado={(nuevoProducto) => {
    if (productoEnEdicion) {
      // edición
      setProductos(productos.map(p => p.id === nuevoProducto.id ? nuevoProducto : p));
    } else {
      // nuevo
      setProductos(prev => [...prev, nuevoProducto]);
    }
    setMostrarFormulario(false);
    setProductoEnEdicion(null);
  }}
  onCerrar={() => {
    setMostrarFormulario(false);
    setProductoEnEdicion(null);
  }}
/>
                </div>
              </div>
            </div>
          </div>
        )}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <>
              <h1 className="text-center mb-4 text-white">🛒 Ferremas - Productos Disponibles</h1>
              <div className="row">
                {productosFiltrados.map(producto => {
                  const imagenSrc = producto.imagenUrl?.startsWith("http")
                    ? producto.imagenUrl
                    : `/img/${producto.imagenUrl}`;

                  return (
                    <div className="col-md-4 mb-4" key={producto.id}>
                      <div className="card h-100 shadow-sm card-hover">
                        <Link to={`/producto/${producto.id}`}>
                          <img
                            src={imagenSrc}
                            className="card-img-top"
                            alt={producto.nombre}
                            style={{ height: "180px", objectFit: "cover" }}
                          />
                        </Link>
                        <div className="card-body">
                          <h5 className="card-title">{producto.nombre}</h5>
                          <p className="card-text">
                            <strong>Categoría:</strong> {producto.categoria} <br />
                            <strong>Precio:</strong> ${producto.precio}
                          </p>
                          <button className="btn btn-primary w-100" onClick={() => agregarAlCarrito(producto)}>
                            Agregar al carrito
                          </button>
                          {rol === 'ADMINISTRADOR' && (
  <>
    <button className="btn btn-warning mt-2 w-100" onClick={() => abrirFormularioEdicion(producto)}>
      ✏️ Editar
    </button>
    <button className="btn btn-danger mt-2 w-100" onClick={() => eliminarProducto(producto.id)}>
      🗑️ Eliminar
    </button>
  </>
)}
                          {dolar && (
                            <button className="btn btn-secondary mt-2 w-100" onClick={() => toggleMostrarUSD(producto.id)}>
                              {mostrarUSD[producto.id] ? 'Ocultar USD' : 'Ver en USD'}
                            </button>
                          )}
                          {mostrarUSD[producto.id] && (
                            <p className="mt-2"><strong>Precio en USD:</strong> ${(producto.precio / dolar).toFixed(2)}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;

