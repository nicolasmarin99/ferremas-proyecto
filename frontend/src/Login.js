import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        const payload = JSON.parse(atob(data.token.split('.')[1]));
        localStorage.setItem('rol', payload.rol);
        localStorage.setItem('username', payload.sub);
        alert('✅ Login exitoso');
        navigate('/');
      } else {
        setError(data.mensaje || '❌ Error al iniciar sesión');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('❌ Error al conectar con el servidor');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar sesión</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Ingresar</button>
      </form>
      <p className="mt-3">
  ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
</p>
    </div>
  );
}

export default Login;