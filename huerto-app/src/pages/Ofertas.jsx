import React from 'react';

export default function Ofertas({ productos, onAddToCart }) {
  const productosOferta = productos.slice(0, 2);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-success">Ofertas Especiales</h1>
        <p className="text-muted">
          Aprovecha nuestros productos seleccionados con descuento.
        </p>
      </div>

      <div className="row justify-content-center g-4">
        {productosOferta.map((producto) => {
          const precioOferta = Math.round(producto.precio * 0.8);

          return (
            <div className="col-md-5" key={producto.id}>
              <div className="card h-100 border-0 shadow-sm overflow-hidden">
                <img
                  src={producto.imagen}
                  className="card-img-top"
                  alt={producto.nombre}
                  style={{ height: '220px', objectFit: 'cover' }}
                />

                <div className="card-body p-4">
                  <span className="badge bg-danger mb-2">
                    20% OFF
                  </span>

                  <h3 className="fw-bold">
                    {producto.nombre}
                  </h3>

                  <p className="text-muted">
                    {producto.descripcion}
                  </p>

                  <div className="mb-3">
                    <span className="text-muted text-decoration-line-through me-2">
                      ${producto.precio}
                    </span>

                    <span className="fs-4 fw-bold text-success">
                      ${precioOferta}
                    </span>
                  </div>

                  <button
                    className="btn btn-success rounded-pill px-4"
                    onClick={() =>
                      onAddToCart({
                        ...producto,
                        precio: precioOferta
                      })
                    }
                  >
                    + Agregar oferta
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}