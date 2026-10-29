import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CompraFallida() {
  const [orden] = useState(() => {
    const guardada = localStorage.getItem('ordenFallida');
    return guardada ? JSON.parse(guardada) : null;
  });

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">

              <div className="text-center">
                <div className="display-1 mb-3">❌</div>
                <h1 className="fw-bold text-danger h2">
                  No se pudo realizar el pago
                </h1>
                {orden && (
                  <p className="text-muted">Orden {orden.numero}</p>
                )}
                <p className="text-muted">
                  Ocurrió un problema al procesar tu pedido. Tu carrito
                  sigue guardado, puedes intentarlo nuevamente.
                </p>

                <Link
                  to="/checkout"
                  className="btn btn-success rounded-pill px-4 mb-4"
                >
                  VOLVER A REALIZAR EL PAGO
                </Link>
              </div>

              {orden && (
                <>
                  <h5 className="fw-bold">Datos de entrega</h5>
                  <p className="mb-1">Cliente: {orden.nombre}</p>
                  <p className="mb-1">Correo: {orden.correo}</p>
                  <p className="mb-3">
                    Dirección: {orden.direccion}, {orden.comuna}, {orden.region}
                  </p>

                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orden.productos.map((p) => (
                        <tr key={p.id}>
                          <td>{p.nombre}</td>
                          <td>${p.precio}</td>
                          <td>{p.cantidad}</td>
                          <td>${p.precio * p.cantidad}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="d-flex justify-content-between border-top pt-3">
                    <strong>Total a pagar:</strong>
                    <strong>${orden.total}</strong>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}