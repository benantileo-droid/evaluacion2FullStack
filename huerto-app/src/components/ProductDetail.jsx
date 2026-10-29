import React from 'react';
import { useParams } from 'react-router-dom';
import { estaEnOferta, precioFinal } from '../utils/precios';

export default function ProductDetail({ productos, onAddToCart }) {
  const { id } = useParams();

  const product = productos.find(
    (producto) => producto.id === Number(id)
  );

  if (!product) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          Producto no encontrado.
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="row g-4 bg-white border rounded shadow-sm p-4">

        <div className="col-md-5">
          <img
            src={product.imagen}
            alt={product.nombre}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-7">
          <span className="badge bg-success mb-2">{product.categoria}</span>
          <h2 className="text-success">{product.nombre}</h2>
          <p className="lead">{product.descripcion}</p>

          {estaEnOferta(product) ? (
            <p className="h4 mb-3">
              <span className="text-muted text-decoration-line-through me-2">
                ${product.precio}
              </span>
              <span className="text-success">${precioFinal(product)}</span>
              <span className="badge bg-danger ms-2">
                {product.descuento}% OFF
              </span>
            </p>
          ) : (
            <p className="h4 text-primary mb-3">${product.precio}</p>
          )}

          <button
            className="btn btn-success me-2"
            onClick={() => onAddToCart(product)}
          >
            Agregar al carrito
          </button>
        </div>

      </div>
    </div>
  );
}