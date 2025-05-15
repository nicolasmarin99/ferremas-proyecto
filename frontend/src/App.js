import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [dolar, setDolar] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [mostrarUSD, setMostrarUSD] = useState({});

  useEffect(() => {
    // Obtener productos desde tu API local
    fetch('http://localhost:8080/api/productos')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error al cargar productos:', error));

    // Obtener valor del dólar desde mindicador.cl
    fetch('https://mindicador.cl/api/dolar')
      .then(res => res.json())
      .then(data => {
        const valorDolar = data.serie[0].valor;
        setDolar(valorDolar);
      })
      .catch(error => console.error('Error al obtener el valor del dólar:', error));
  }, []);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    alert(`Agregado al carrito: ${producto.nombre}`);
  };

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const toggleMostrarUSD = (id) => {
    setMostrarUSD(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
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

  return (
    <div style={estiloFondo}>
      <div className="container mt-4">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg bg-body-tertiary mb-4 border rounded shadow-sm px-3">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Ferremas</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ maxHeight: '100px' }}>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Inicio</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Catálogo</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Iniciar sesión</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Más
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Ofertas</a></li>
                    <li><a className="dropdown-item" href="#">Novedades</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Contacto</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" aria-disabled="true">Desactivado</a>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar"
                  aria-label="Search"
                  value={busqueda}
                  onChange={handleBusquedaChange}
                />
                <button className="btn btn-outline-success" type="submit">Buscar</button>
              </form>
            </div>
          </div>
        </nav>

        {/* Título */}
        <h1 className="text-center mb-4 text-white">🛒 Ferremas - Productos Disponibles</h1>

        {/* Cards de productos */}
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
                  {dolar && (
                    <button
                      className="btn btn-secondary mt-2 w-100"
                      onClick={() => toggleMostrarUSD(producto.id)}
                    >
                      {mostrarUSD[producto.id] ? 'Ocultar USD' : 'Ver en USD'}
                    </button>
                  )}
                  {mostrarUSD[producto.id] && (
                    <p className="mt-2">
                      <strong>Precio en USD:</strong> ${ (producto.precio / dolar).toFixed(2) }
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carrito */}
        <hr className="my-4" />
        <h2 className="text-white">🧺 Carrito ({carrito.length})</h2>
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
