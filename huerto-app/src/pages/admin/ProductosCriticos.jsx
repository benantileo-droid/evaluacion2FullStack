import React from 'react';
import { Link } from 'react-router-dom';
import { STOCK_CRITICO, esStockCritico } from '../../utils/inventario';

export default function ProductosCriticos({ productos = [] }) {
  // Los de menor stock primero
  const criticos = productos
    .filter(esStockCritico)
    .sort((a, b) => a.stock - b.stock);

  return (
    <div className="container py-5">
      <h1 className="fw-bold text-danger mb-1">Productos críticos</h1>
      <p className="text-muted mb-4">
        Productos con {STOCK_CRITICO} unidades o menos en stock.
      </p>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          {criticos.length === 0 ? (
            <div className="alert alert-success mb-0">
              Todo en orden: no hay productos con stock crítico.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Stock</th>
                    <th className="text-end">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {criticos.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.nombre}</td>
                      <td>{producto.categoria}</td>
                      <td>
                        <span className="badge bg-danger">
                          {producto.stock}
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          to={`/admin/productos/${producto.id}/editar`}
                          className="btn btn-outline-success btn-sm"
                        >
                          Reponer stock
                        </Link>
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