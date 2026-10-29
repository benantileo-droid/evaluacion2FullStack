import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard({
  productos = [],
  usuarios = [],
  ordenes = []
}) {
  const compras = ordenes.map((orden) => ({
    ...orden,
    cliente: orden.nombre
  }));

  const totalIngresos = compras.reduce(
    (acumulador, compra) => acumulador + (compra.total || 0),
    0
  );

  const totalClientes = usuarios.filter(
    (usuario) => usuario.rol !== 'admin'
  ).length;

  const ultimasCompras = [...compras].reverse().slice(0, 5);

  // Cantidad de productos por categoría
  const productosPorCategoria = productos.reduce((acumulador, producto) => {
    const categoria = producto.categoria || 'Sin categoría';
    acumulador[categoria] = (acumulador[categoria] || 0) + 1;
    return acumulador;
  }, {});

  return (
    <div className="container py-5">
      <h1 className="fw-bold text-success mb-1">Dashboard</h1>
      <p className="text-muted mb-4">Resumen de las actividades diarias</p>

      {/* TARJETAS DE RESUMEN */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card text-white bg-primary border-0 shadow-sm h-100">
            <div className="card-body">
              <h6 className="mb-1">Compras</h6>
              <h2 className="fw-bold mb-0">{compras.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="card text-white bg-success border-0 shadow-sm h-100">
            <div className="card-body">
              <h6 className="mb-1">Productos</h6>
              <h2 className="fw-bold mb-0">{productos.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="card text-dark bg-warning border-0 shadow-sm h-100">
            <div className="card-body">
              <h6 className="mb-1">Clientes</h6>
              <h2 className="fw-bold mb-0">{totalClientes}</h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="card text-white bg-dark border-0 shadow-sm h-100">
            <div className="card-body">
              <h6 className="mb-1">Ingresos</h6>
              <h2 className="fw-bold mb-0">${totalIngresos}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* ACCESOS RÁPIDOS */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm h-100 text-center">
            <div className="card-body">
              <h5 className="fw-bold">Productos</h5>
              <p className="text-muted small">
                Administrar inventario y detalles de los productos.
              </p>
              <Link to="/admin/productos" className="btn btn-outline-success btn-sm">
                Ir a productos
              </Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm h-100 text-center">
            <div className="card-body">
              <h5 className="fw-bold">Usuarios</h5>
              <p className="text-muted small">
                Gestión de cuentas de usuario y sus compras.
              </p>
              <Link to="/admin/usuarios" className="btn btn-outline-success btn-sm">
                Ir a usuarios
              </Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm h-100 text-center">
            <div className="card-body">
              <h5 className="fw-bold">Tienda</h5>
              <p className="text-muted small">
                Visualiza la tienda como la ven tus clientes.
              </p>
              <Link to="/" className="btn btn-outline-success btn-sm">
                Ir a la tienda
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        {/* ÚLTIMAS COMPRAS */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Últimas compras</h5>

              {ultimasCompras.length === 0 ? (
                <div className="alert alert-secondary mb-0">
                  Aún no hay compras registradas.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead>
                      <tr>
                        <th>N° orden</th>
                        <th>Cliente</th>
                        <th>Fecha</th>
                        <th className="text-end">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ultimasCompras.map((compra, indice) => (
                        <tr key={compra.numero || indice}>
                          <td>{compra.numero}</td>
                          <td>{compra.cliente}</td>
                          <td>{compra.fecha}</td>
                          <td className="text-end">${compra.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PRODUCTOS POR CATEGORÍA */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Productos por categoría</h5>

              {Object.keys(productosPorCategoria).length === 0 ? (
                <div className="alert alert-secondary mb-0">
                  No hay productos.
                </div>
              ) : (
                <ul className="list-group list-group-flush">
                  {Object.entries(productosPorCategoria).map(
                    ([categoria, cantidad]) => (
                      <li
                        key={categoria}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        {categoria}
                        <span className="badge bg-success rounded-pill">
                          {cantidad}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}