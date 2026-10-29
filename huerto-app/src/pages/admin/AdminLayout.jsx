import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';

const enlaces = [
  { to: '/admin', texto: 'Dashboard', icono: '📊', end: true },
  { to: '/admin/ordenes', texto: 'Órdenes', icono: '🧾' },
  { to: '/admin/usuarios', texto: 'Usuarios', icono: '👥' }
];

export default function AdminLayout({ usuarioActual, onLogout }) {
  return (
    <div className="d-flex flex-column flex-md-row min-vh-100 bg-light">

      <aside
        className="bg-dark text-white p-3 d-print-none"
        style={{ minWidth: '230px' }}
      >
        <h5 className="fw-bold mb-1">🌱 Huerto Hogar</h5>
        <small className="text-secondary d-block mb-3">
          Panel de administración
        </small>

        <nav className="nav nav-pills flex-wrap flex-md-column gap-1">
          {enlaces.map((enlace) => (
            <NavLink
              key={enlace.to}
              to={enlace.to}
              end={enlace.end}
              className={({ isActive }) =>
                `nav-link text-white ${isActive ? 'active bg-success' : ''}`
              }
            >
              {enlace.icono} {enlace.texto}
            </NavLink>
          ))}
        </nav>

        <hr />

        <p className="small mb-2">👤 {usuarioActual?.nombre}</p>

        <Link to="/" className="btn btn-outline-light btn-sm w-100 mb-2">
          🏪 Ir a la tienda
        </Link>

        <button className="btn btn-danger btn-sm w-100" onClick={onLogout}>
          Cerrar sesión
        </button>
      </aside>

      <main className="flex-grow-1 overflow-auto">
        <Outlet />
      </main>

    </div>
  );
}