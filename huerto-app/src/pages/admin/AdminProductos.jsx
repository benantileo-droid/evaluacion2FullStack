import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { estaEnOferta, precioFinal } from '../../utils/precios';
import { esStockCritico } from '../../utils/inventario';

export default function AdminProductos({ productos = [], onDelete }) {
  const [busqueda, setBusqueda] = useState('');

  const texto = busqueda.trim().toLowerCase();

  const productosFiltrados = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(texto) ||
      (p.categoria || '').toLowerCase().includes(texto)
  );

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <div>
          <h1 className="fw-bold text-success mb-1">Productos</h1>
          <p className="text-muted mb-0">
            Administrar inventario y detalles de los productos.
          </p>
        </div>

        <Link to="/admin/productos/nuevo" className="btn btn-success">
          ➕ Nuevo producto
        </Link>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="🔍 Buscar por nombre o categoría..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          {productosFiltrados.length === 0 ? (
            <div className="alert alert-secondary mb-0">
              No hay productos para mostrar.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productosFiltrados.map((producto) => (
                    <tr key={producto.id}>
                      <td>
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          width="48"
                          height="48"
                          style={{ objectFit: 'cover' }}
                          className="rounded"
                        />
                      </td>
                      <td>{producto.nombre}</td>
                      <td>{producto.categoria}</td>
                      <td>
                        {estaEnOferta(producto) ? (
                          <>
                            <small className="text-muted text-decoration-line-through me-1">
                              ${producto.precio}
                            </small>
                            ${precioFinal(producto)}
                            <span className="badge bg-danger ms-1">
                              {producto.descuento}%
                            </span>
                          </>
                        ) : (
                          <>${producto.precio}</>
                        )}
                      </td>
                      <td>
                        {typeof producto.stock !== 'number' ? (
                          '—'
                        ) : (
                          <span
                            className={`badge ${
                              esStockCritico(producto)
                                ? 'bg-danger'
                                : 'bg-success'
                            }`}
                          >
                            {producto.stock}
                          </span>
                        )}
                      </td>
                      <td className="text-end">
                        <Link
                          to={`/admin/productos/${producto.id}/editar`}
                          className="btn btn-warning btn-sm me-2"
                        >
                          ✏️ Editar
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => onDelete(producto.id)}
                        >
                          🗑️ Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}