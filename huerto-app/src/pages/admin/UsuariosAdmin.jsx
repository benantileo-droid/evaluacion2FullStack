import React, { useState } from 'react';

export default function UsuariosAdmin({ usuarios }) {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  return (
    <div className="container py-5">
      <h1 className="fw-bold text-success mb-4">
        Administración de Usuarios
      </h1>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Comuna</th>
                  <th>Compras</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.nombre}</td>

                    <td>{usuario.email}</td>

                    <td>
                      <span
                        className={
                          usuario.rol === 'admin'
                            ? 'badge bg-danger'
                            : 'badge bg-success'
                        }
                      >
                        {usuario.rol}
                      </span>
                    </td>

                    <td>{usuario.comuna || 'Sin comuna'}</td>

                    <td>{usuario.compras?.length || 0}</td>

                    <td>
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() =>
                          setUsuarioSeleccionado(usuario)
                        }
                      >
                        Ver historial
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {usuarioSeleccionado && (
        <div className="card border-0 shadow-sm mt-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="fw-bold mb-0">
                Historial de {usuarioSeleccionado.nombre}
              </h3>

              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setUsuarioSeleccionado(null)}
              >
                Cerrar
              </button>
            </div>

            {usuarioSeleccionado.compras?.length > 0 ? (
              usuarioSeleccionado.compras.map((compra) => (
                <div
                  key={compra.numero}
                  className="border rounded p-3 mb-3"
                >
                  <p className="mb-1">
                    <strong>Orden:</strong> {compra.numero}
                  </p>

                  <p className="mb-1">
                    <strong>Fecha:</strong> {compra.fecha}
                  </p>

                  <p className="mb-1">
                    <strong>Entrega:</strong> {compra.tipoEntrega}
                  </p>

                  <p className="mb-2">
                    <strong>Total:</strong> ${compra.total}
                  </p>

                  <strong>Productos:</strong>

                  <ul className="mb-0">
                    {compra.productos?.map((producto) => (
                      <li key={producto.id}>
                        {producto.nombre} x{producto.cantidad}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <div className="alert alert-secondary mb-0">
                Este usuario todavía no tiene compras.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}