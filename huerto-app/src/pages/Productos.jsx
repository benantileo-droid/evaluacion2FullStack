import React from 'react';
import ProductCard from '../components/ProductCard';

export default function Productos({
  productos,
  productosFiltrados,
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  categorias = [],
  onAddToCart,
  onDelete,
  onEdit,
  modoAdmin,
  onNewProduct
}) {
  return (
    <div className="container py-5">
      <h1 className="fw-bold text-success mb-4">
        Nuestros Productos
      </h1>
      {modoAdmin && (
  <button
    className="btn btn-success mb-4"
    onClick={onNewProduct}
  >
    ➕ Nuevo producto
  </button>
)}
<div className="d-flex gap-2 mb-4">
    {['Todas', ...categorias.map((c) => c.nombre)].map((cat) => (
    <button
      key={cat}
      className={`btn rounded-pill px-4 ${
        categoriaSeleccionada === cat
          ? 'btn-success'
          : 'btn-outline-success'
      }`}
      onClick={() => setCategoriaSeleccionada(cat)}
    >
      {cat}
    </button>
  ))}
</div>
      <div className="row">
        {productosFiltrados.map((producto) => (
          <ProductCard
  key={producto.id}
  product={producto}
  onAddToCart={onAddToCart}
  onDelete={onDelete}
  onEdit={onEdit}
  modoAdmin={modoAdmin}
/>
        ))}
      </div>
    </div>
  );
}