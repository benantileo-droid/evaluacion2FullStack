import React from 'react';
import { Link } from 'react-router-dom';

export default function Carrito({
  carrito,
  onRemove,
  onIncrease,
  onDecrease
}) {
  const total = carrito.reduce(
    (acumulador, producto) =>
      acumulador + producto.precio * producto.cantidad,
    0
  );

  return (
    <div className="container py-5">
      <h1 className="fw-bold text-success mb-4">
        Mi Carrito 🛒
      </h1>

      {carrito.length === 0 ? (
        <div className="alert alert-secondary">
          Tu carrito está vacío.
        </div>
      ) : (
        <div>
          {carrito.map((producto) => (
            <div
              key={producto.id}
              className="card border-0 shadow-sm mb-3"
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                
                <div>
                  <h5 className="fw-bold mb-1">
                    {producto.nombre}
                  </h5>

                  <div className="d-flex align-items-center gap-2 mt-2">
  <span className="text-muted">Cantidad:</span>

  <button
    className="btn btn-outline-secondary btn-sm"
    onClick={() => onDecrease(producto.id)}
  >
    −
  </button>

  <strong>{producto.cantidad}</strong>

  <button
    className="btn btn-outline-success btn-sm"
    onClick={() => onIncrease(producto.id)}
  >
    +
  </button>
</div>
                </div>

                <div className="d-flex align-items-center">
                  <span className="fw-bold text-success fs-5">
                    ${producto.precio * producto.cantidad}
                  </span>

                  <button
                    className="btn btn-outline-danger btn-sm ms-3"
                    onClick={() => onRemove(producto.id)}
                  >
                    Eliminar
                  </button>
                </div>

              </div>
            </div>
          ))}

          <div className="text-end mt-4">
            <h3 className="fw-bold">
              Total: ${total}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}