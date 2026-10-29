import React from 'react';
import { estaEnOferta, precioFinal } from '../utils/precios';

export default function Ofertas({ productos = [], onAddToCart }) {
  const productosOferta = productos.filter(estaEnOferta);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-success">Ofertas Especiales</h1>
        <p className="text-muted">
          Aprovecha nuestros productos seleccionados con descuento.
        </p>
      </div>

      {productosOferta.length === 0 && (
        <div className="alert alert-info text-center">
          Por ahora no hay productos en oferta.
        </div>
      )}

      <div className="row g-4">
        {productosOferta.map((producto) => (
          <div className="col-12 col-md-6 col-lg-4" key={producto.id}>
            <div className="card h-100 border-0 shadow-sm overflow-hidden">
              <img
                src={producto.imagen}
                className="card-img-top"
                alt={producto.nombre}
                style={{ height: '200px', objectFit: 'cover' }}
              />

              <div className="card-body p-4 d-flex flex-column">
                <span className="badge bg-danger mb-2 align-self-start">
                  {producto.descuento}% OFF
                </span>

                <h3 className="fw-bold h5">{producto.nombre}</h3>
                <p className="text-muted small">{producto.descripcion}</p>

                <div className="mt-auto">
                  <div className="mb-3">
                    <span className="text-muted text-decoration-line-through me-2">
                      ${producto.precio}
                    </span>
                    <span className="fs-4 fw-bold text-success">
                      ${precioFinal(producto)}
                    </span>
                  </div>

                  <button
                    className="btn btn-success rounded-pill px-4"
                    onClick={() => onAddToCart(producto)}
                  >
                    + Agregar oferta
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}