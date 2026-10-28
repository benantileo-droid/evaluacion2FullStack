import React, { useState } from 'react';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const iniciarSesion = () => {
    if (correo === '' || password === '') {
      alert('Por favor completa todos los campos.');
      return;
    }

    alert('Inicio de sesión exitoso.');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h1 className="fw-bold text-success mb-4">
                Iniciar Sesión
              </h1>

              <div className="mb-3">
                <label className="form-label">
                  Correo
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="correo@ejemplo.cl"
                />
              </div>

              <div className="mb-4">
                <label className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                />
              </div>

              <button
                className="btn btn-success w-100 rounded-pill"
                onClick={iniciarSesion}
              >
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}