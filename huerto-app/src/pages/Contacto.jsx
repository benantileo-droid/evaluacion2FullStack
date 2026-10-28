import React, { useState } from 'react';

export default function Contacto() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const enviarMensaje = () => {
    if (nombre === '' || correo === '' || mensaje === '') {
      alert('Por favor completa todos los campos.');
      return;
    }

    alert('Mensaje enviado correctamente.');

    setNombre('');
    setCorreo('');
    setMensaje('');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h1 className="fw-bold text-success mb-4">
                Contáctanos
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

              <div className="mb-4">
                <label className="form-label">Mensaje</label>
                <textarea
                  className="form-control"
                  rows="5"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                />
              </div>

              <button
                className="btn btn-success w-100 rounded-pill"
                onClick={enviarMensaje}
              >
                Enviar mensaje
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}