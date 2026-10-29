import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductForm from './ProductForm';

export default function AdminProductoForm({
  productos = [],
  categorias = [],
  onCreate,
  onUpdate
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const productoEditando = id
    ? productos.find((p) => p.id === Number(id))
    : null;

  if (id && !productoEditando) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">El producto no existe.</div>
        <Link to="/admin/productos" className="btn btn-outline-secondary btn-sm">
          ← Volver a productos
        </Link>
      </div>
    );
  }

  const guardar = (datos) => {
    if (productoEditando) {
      onUpdate(productoEditando.id, datos);
    } else {
      onCreate(datos);
    }

    navigate('/admin/productos');
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <Link
            to="/admin/productos"
            className="btn btn-outline-secondary btn-sm mb-3"
          >
            ← Volver a productos
          </Link>

          <ProductForm
            onSave={guardar}
            productoEditando={productoEditando}
            categorias={categorias}
          />
        </div>
      </div>
    </div>
  );
}