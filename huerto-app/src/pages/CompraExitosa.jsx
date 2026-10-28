import React from 'react';
import { Link } from 'react-router-dom';

export default function CompraExitosa() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center p-5">
              <div className="display-1 mb-3">✅</div>

              <h1 className="fw-bold text-success">
                ¡Compra realizada con éxito!
              </h1>

              <p className="text-muted mt-3">
                Tu pedido fue registrado correctamente.
              </p>

              <Link
                to="/productos"
                className="btn btn-success rounded-pill px-4 mt-3"
              >
                Volver a productos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}