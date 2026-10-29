import React from 'react';

export default function Boleta({ orden }) {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">

        <div className="d-flex justify-content-between flex-wrap border-bottom pb-2 mb-3">
          <h4 className="fw-bold mb-0">Boleta {orden.numero}</h4>
          <span className="text-muted">{orden.fecha}</span>
        </div>

        <h6 className="fw-bold">Cliente</h6>
        <p className="mb-1">{orden.nombre}</p>
        {orden.correo && <p className="mb-1">{orden.correo}</p>}

        <h6 className="fw-bold mt-3">Entrega</h6>
        <p className="mb-1">{orden.tipoEntrega}</p>
        <p className="mb-1">
          {orden.direccion}, {orden.comuna}
          {orden.region ? `, ${orden.region}` : ''}
        </p>
        {orden.indicaciones && (
          <p className="mb-1">Indicaciones: {orden.indicaciones}</p>
        )}

        <div className="table-responsive mt-3">
          <table className="table table-sm align-middle">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {orden.productos?.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>${p.precio}</td>
                  <td>{p.cantidad}</td>
                  <td>${p.precio * p.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between border-top pt-3">
          <strong>Total pagado:</strong>
          <strong className="text-success">${orden.total}</strong>
        </div>

      </div>
    </div>
  );
}