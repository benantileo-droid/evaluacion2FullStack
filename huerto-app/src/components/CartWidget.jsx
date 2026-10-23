import React from 'react';

export default function CartWidget({ items = [] }) {
  const totalCantidad = items.reduce((acc, item) => acc + item.cantidad, 0);
  const totalMonto = items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  if (items.length === 0) {
    return <div className="alert alert-info">Tu carrito está vacío</div>;
  }

  return (
    <div className="card p-3 shadow-sm border-success">
      <h5 className="card-title">Resumen de Compra</h5>
      <p className="mb-1">Productos en carrito: <strong>{totalCantidad}</strong></p>
      <p className="mb-2">Total a pagar: <strong>${totalMonto}</strong></p>
      <button className="btn btn-success w-100">Finalizar Compra</button>
    </div>
  );
}