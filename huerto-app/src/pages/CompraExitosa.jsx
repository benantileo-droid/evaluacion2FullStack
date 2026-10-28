import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CompraExitosa() {
  const [orden] = useState(() => {
    const guardada = localStorage.getItem('ultimaOrden');
    return guardada ? JSON.parse(guardada) : null;
  });

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">

              <div className="text-center">
                <div className="display-1 mb-3">✅</div>

                <h1 className="fw-bold text-success">
                  ¡Compra realizada con éxito!
                </h1>

                <p className="text-muted mt-3">
                  Tu pedido fue registrado correctamente.
                </p>
              </div>

              {orden && (
                <div className="mt-4">

                  <div className="d-flex justify-content-between flex-wrap border-bottom pb-2 mb-3">
                    <strong>Orden: {orden.numero}</strong>
                    <span className="text-muted">{orden.fecha}</span>
                  </div>

                  <h5 className="fw-bold">Datos de entrega</h5>
                  <p className="mb-1">Cliente: {orden.nombre}</p>
                  <p className="mb-1">Dirección: {orden.direccion}, {orden.comuna}</p>
                  <p className="mb-3">Tipo de entrega: {orden.tipoEntrega}</p>

                  <h5 className="fw-bold">Productos</h5>
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Producto</th>
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
                    <strong>Total pagado:</strong>
                    <strong className="text-success">${orden.total}</strong>
                  </div>

                </div>
              )}

              <div className="text-center">
                <Link
                  to="/productos"
                  className="btn btn-success rounded-pill px-4 mt-4"
                >
                  Volver a productos
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}