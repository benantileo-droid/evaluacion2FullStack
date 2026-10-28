import React from 'react';
import { useParams } from 'react-router-dom';

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
  if (!product) return null;

  return (
    <div className="container my-4 p-4 border rounded bg-white shadow-sm">
      <h2 className="text-success">{product.nombre}</h2>
      <p className="lead">{product.descripcion}</p>
      <p className="h4 text-primary mb-3">${product.precio}</p>
      <button
  className="btn btn-success me-2"
  onClick={() => onAddToCart(product)}
>
  Agregar al carrito
</button>
    </div>
  );
}