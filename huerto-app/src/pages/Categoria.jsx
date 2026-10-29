import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Categoria({
  categorias = [],
  productos = [],
  onAddToCart
}) {
  const { nombre } = useParams();

  const categoriaActual = categorias.find((c) => c.nombre === nombre);
  const productosCategoria = productos.filter((p) => p.categoria === nombre);

  return (
    <div className="container py-5">
      <h1 className="fw-bold text-success text-center mb-4">Categorías</h1>

      {/* TARJETAS DE CATEGORÍAS */}
      <div className="row justify-content-center g-3 mb-5">
        {categorias.map((cat) => (
          <div className="col-6 col-md-3" key={cat.id}>
            <Link
              to={`/categorias/${encodeURIComponent(cat.nombre)}`}
              className="text-decoration-none"
            >
              <div
                className={`card h-100 text-center shadow-sm ${
                  cat.nombre === nombre ? 'border-success border-2' : 'border-0'
                }`}
              >
                <div className="card-body">
                  <div className="display-4">{cat.emoji || '🌱'}</div>
                  <h5 className="fw-bold text-dark mt-2 mb-0">{cat.nombre}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {!nombre && (
        <p className="text-center text-muted">
          Selecciona una categoría para ver sus productos.
        </p>
      )}

      {nombre && !categoriaActual && (
        <div className="alert alert-danger">La categoría no existe.</div>
      )}

      {categoriaActual && (
        <>
          <h2 className="fw-bold mb-1">{categoriaActual.nombre}</h2>
          {categoriaActual.descripcion && (
            <p className="text-muted">{categoriaActual.descripcion}</p>
          )}

          {productosCategoria.length === 0 ? (
            <div className="alert alert-info">
              Aún no hay productos en esta categoría.
            </div>
          ) : (
            <div className="row">
              {productosCategoria.map((producto) => (
                <ProductCard
                  key={producto.id}
                  product={producto}
                  onAddToCart={onAddToCart}
                  modoAdmin={false}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}