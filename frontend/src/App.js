import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/productos')
      .then(response => response.json())
      .then(data => setProductos(data));
  }, []);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    alert(`Agregado al carrito: ${producto.nombre}`);
  };

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div
      style={{
        backgroundImage: "url('/img/fondoferre.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <div className="container mt-4">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg bg-body-tertiary mb-4 border rounded shadow-sm px-3">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Ferremas</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                <li className="nav-item">
                  <a className="nav-link active" href="#">Inicio</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Catálogo</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Iniciar sesión</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                    Más
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Ofertas</a></li>
                    <li><a className="dropdown-item" href="#">Novedades</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Contacto</a></li>
                  </ul>
                </li>
              </ul>
              <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </form>
            </div>
          </div>
        </nav>

        <h1 className="text-center mb-4" style={{ color: 'white' }}>
          🛒 Ferremas - Productos Disponibles </h1>

        <div className="row">
          {productosFiltrados.map(producto => (
            <div className="col-md-4 mb-4" key={producto.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src="https://via.placeholder.com/300x180.png?text=Producto"
                  className="card-img-top"
                  alt={producto.nombre}
                />
                <div className="card-body">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text">
                    <strong>Categoría:</strong> {producto.categoria} <br />
                    <strong>Precio:</strong> ${producto.precio}
                  </p>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => agregarAlCarrito(producto)}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr className="my-4" />
        <h2>🧺 Carrito ({carrito.length})</h2>
        <ul className="list-group">
          {carrito.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between">
              <span>{item.nombre}</span>
              <span>${item.precio}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
