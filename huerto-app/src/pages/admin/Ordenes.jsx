import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Ordenes({ ordenes = [] }) {
  const [busqueda, setBusqueda] = useState('');

  const texto = busqueda.trim().toLowerCase();

  // Las más recientes primero
  const ordenesFiltradas = [...ordenes].reverse().filter(
    (orden) =>
      (orden.numero || '').toLowerCase().includes(texto) ||
      (orden.nombre || '').toLowerCase().includes(texto)
  );

  return (
    <div className="container py-5">
      <h1 className="fw-bold text-success mb-1">Órdenes / Boletas</h1>
      <p className="text-muted mb-4">
        Gestión y seguimiento de las órdenes de compra realizadas.
      </p>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="🔍 Buscar por N° de orden o cliente..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          {ordenesFiltradas.length === 0 ? (
            <div className="alert alert-secondary mb-0">
              No hay órdenes para mostrar.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>N° orden</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Comuna</th>
                    <th className="text-end">Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {ordenesFiltradas.map((orden) => (
                    <tr key={orden.numero}>
                      <td>{orden.numero}</td>
                      <td>{orden.nombre}</td>
                      <td>{orden.fecha}</td>
                      <td>{orden.comuna}</td>
                      <td className="text-end">${orden.total}</td>
                      <td className="text-end">
                        <Link
                          to={`/admin/ordenes/${orden.numero}`}
                          className="btn btn-outline-success btn-sm"
                        >
                          Ver boleta
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}