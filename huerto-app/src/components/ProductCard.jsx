import React from 'react';

export default function ProductCard({ product, onAddToCart, onDelete, onEdit }) {
  return (
    <div className="col-12 col-sm-6 col-md-6 col-lg-6 mb-4">
      <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden">
        <div className="position-relative">
          <img 
            src={product.imagen || 'https://via.placeholder.com/300'} 
            className="card-img-top" 
            alt={product.nombre} 
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <span className="position-absolute top-0 start-0 bg-success text-white badge m-2 px-3 py-2 rounded-pill">
            {product.categoria || 'Orgánico'}
          </span>
        </div>
        <div className="card-body d-flex flex-column p-4">
          <h5 className="card-title fw-bold text-dark mb-1">{product.nombre}</h5>
          <p className="card-text text-muted small mb-3">{product.descripcion || 'Producto fresco del huerto.'}</p>
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <span className="fs-4 fw-bold text-success">${product.precio}</span>
            <button 
              onClick={() => onAddToCart(product)} 
              className="btn btn-success px-3 rounded-pill fw-bold shadow-sm"
            >
              + Agregar
            </button>
            <button
  onClick={() => onDelete(product.id)}
  className="btn btn-danger px-3 rounded-pill fw-bold shadow-sm ms-2"
>
  Eliminar
</button>
<button
  onClick={() => onEdit(product)}
  className="btn btn-warning px-3 rounded-pill fw-bold shadow-sm ms-2"
>
  Editar
</button>
          </div>
        </div>
      </div>
    </div>
  );
}