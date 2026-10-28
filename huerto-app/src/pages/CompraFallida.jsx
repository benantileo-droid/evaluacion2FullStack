import React from 'react';
import { Link } from 'react-router-dom';

export default function CompraFallida() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center p-5">
              <div className="display-1 mb-3">❌</div>

              <h1 className="fw-bold text-danger">
                No se pudo realizar la compra
              </h1>

              <p className="text-muted mt-3">
                Ocurrió un problema al procesar tu pedido.
                Puedes intentarlo nuevamente.
              </p>

              <Link
                to="/checkout"
                className="btn btn-danger rounded-pill px-4 mt-3"
              >
                Volver al Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}