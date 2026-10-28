import React, { useState } from 'react';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');

  const registrarUsuario = () => {
    if (
      nombre === '' ||
      correo === '' ||
      password === '' ||
      confirmarPassword === ''
    ) {
      alert('Por favor completa todos los campos.');
      return;
    }

    if (password !== confirmarPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    alert('Usuario registrado correctamente.');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h1 className="fw-bold text-success mb-4">
                Crear Cuenta
              </h1>

              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Correo</label>
                <input
                  type="email"
                  className="form-control"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmarPassword}
                  onChange={(e) => setConfirmarPassword(e.target.value)}
                />
              </div>

              <button
                className="btn btn-success w-100 rounded-pill"
                onClick={registrarUsuario}
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}