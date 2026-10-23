import React from 'react';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm">
        <img 
          src={product.imagen || 'https://via.placeholder.com/150'} 
          className="card-img-top p-3" 
          alt={product.nombre} 
          style={{ height: '180px', objectFit: 'contain' }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-success">{product.nombre}</h5>
          <p className="card-text fw-bold">${product.precio}</p>
          <button 
            onClick={() => onAddToCart(product)} 
            className="btn btn-outline-success mt-auto w-100"
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}