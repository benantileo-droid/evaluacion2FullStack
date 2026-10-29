import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Boleta from '../../components/Boleta';

export default function BoletaAdmin({ ordenes = [] }) {
  const { numero } = useParams();

  const orden = ordenes.find((o) => o.numero === numero);

  if (!orden) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">La orden no existe.</div>
        <Link to="/admin/ordenes" className="btn btn-outline-secondary btn-sm">
          ← Volver a órdenes
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between mb-3 d-print-none">
        <Link to="/admin/ordenes" className="btn btn-outline-secondary btn-sm">
          ← Volver a órdenes
        </Link>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => window.print()}
        >
          Imprimir boleta en PDF
        </button>
      </div>

      <Boleta orden={orden} />
    </div>
  );
}