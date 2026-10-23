import React from 'react';

export default function ProductDetail({ product }) {
  if (!product) return null;

  return (
    <div className="container my-4 p-4 border rounded bg-white shadow-sm">
      <h2 className="text-success">{product.nombre}</h2>
      <p className="lead">{product.descripcion}</p>
      <p className="h4 text-primary mb-3">${product.precio}</p>
      <button 
        className="btn btn-success me-2" 
        disabled={product.stock === 0}
      >
        {product.stock === 0 ? 'Sin Stock' : 'Comprar Ahora'}
      </button>
    </div>
  );
}