import React from 'react';
import { Link } from 'react-router-dom';
import { estaEnOferta, precioFinal } from '../utils/precios';

export default function ProductCard({
  product,
  onAddToCart,
  onDelete,
  onEdit,
  modoAdmin
}) {
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
    {estaEnOferta(product) ? (
    <div>
      <small className="text-muted text-decoration-line-through d-block">
        ${product.precio}
      </small>
      <span className="fs-4 fw-bold text-success">
        ${precioFinal(product)}
      </span>
    </div>
  ) : (
    <span className="fs-4 fw-bold text-success">
      ${product.precio}
    </span>
  )}

  {modoAdmin ? (
    <>
      <button
        className="btn btn-warning btn-sm"
        onClick={() => onEdit(product)}
      >
        ✏️ Editar
      </button>

      <button
        className="btn btn-danger btn-sm"
        onClick={() => onDelete(product.id)}
      >
        🗑️ Eliminar
      </button>
    </>
  ) : (
    <>
      <button
        className="btn btn-success btn-sm"
        onClick={() => onAddToCart(product)}
      >
        + Agregar
      </button>

      <Link
        to={`/productos/${product.id}`}
        className="btn btn-outline-success btn-sm"
      >
        Ver detalle
      </Link>
    </>
  )}
</div>
          </div>
        </div>
      </div>
  );
}