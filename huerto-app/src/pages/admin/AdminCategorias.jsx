import React, { useState } from 'react';

const FORM_VACIO = { nombre: '', emoji: '', descripcion: '' };

export default function AdminCategorias({
  categorias = [],
  productos = [],
  onCreate,
  onUpdate,
  onDelete
}) {
  const [form, setForm] = useState(FORM_VACIO);
  const [editandoId, setEditandoId] = useState(null);
  const [error, setError] = useState('');

  const contarProductos = (nombre) =>
    productos.filter((p) => p.categoria === nombre).length;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const cancelar = () => {
    setForm(FORM_VACIO);
    setEditandoId(null);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nombre = form.nombre.trim();

    if (!nombre) {
      setError('El nombre es obligatorio');
      return;
    }

    const repetida = categorias.some(
      (c) =>
        c.id !== editandoId &&
        c.nombre.toLowerCase() === nombre.toLowerCase()
    );

    if (repetida) {
      setError('Ya existe una categoría con ese nombre');
      return;
    }

    const datos = {
      nombre,
      emoji: form.emoji.trim(),
      descripcion: form.descripcion.trim()
    };

    if (editandoId) {
      onUpdate(editandoId, datos);
    } else {
      onCreate(datos);
    }

    cancelar();
  };

  const handleEditar = (categoria) => {
    setEditandoId(categoria.id);
    setForm({
      nombre: categoria.nombre,
      emoji: categoria.emoji || '',
      descripcion: categoria.descripcion || ''
    });
    setError('');
  };

  const handleEliminar = (categoria) => {
    if (contarProductos(categoria.nombre) > 0) {
      setError(
        `No puedes eliminar "${categoria.nombre}" porque tiene productos asociados.`
      );
      return;
    }

    setError('');
    onDelete(categoria.id);

    if (editandoId === categoria.id) {
      cancelar();
    }
  };

  return (
    <div className="container py-5">
      <h1 className="fw-bold text-success mb-1">Categorías</h1>
      <p className="text-muted mb-4">
        Organizar productos en categorías para facilitar su navegación.
      </p>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-4">

        {/* FORMULARIO */}
        <div className="col-lg-4">
          <form
            onSubmit={handleSubmit}
            className="card border-0 shadow-sm p-3"
          >
            <h5 className="fw-bold mb-3">
              {editandoId ? '✏️ Editar categoría' : '➕ Nueva categoría'}
            </h5>

            <div className="mb-3">
              <label htmlFor="catNombre" className="form-label fw-semibold">
                Nombre
              </label>
              <input
                id="catNombre"
                name="nombre"
                className="form-control"
                value={form.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="catEmoji" className="form-label fw-semibold">
                Emoji (opcional)
              </label>
              <input
                id="catEmoji"
                name="emoji"
                className="form-control"
                value={form.emoji}
                onChange={handleChange}
                placeholder="🍎"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="catDescripcion" className="form-label fw-semibold">
                Descripción (opcional)
              </label>
              <textarea
                id="catDescripcion"
                name="descripcion"
                className="form-control"
                rows="2"
                value={form.descripcion}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-success w-100 mb-2">
              {editandoId ? 'Guardar cambios' : 'Crear categoría'}
            </button>

            {editandoId && (
              <button
                type="button"
                className="btn btn-outline-secondary w-100"
                onClick={cancelar}
              >
                Cancelar
              </button>
            )}
          </form>
        </div>

        {/* LISTADO */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              {categorias.length === 0 ? (
                <div className="alert alert-secondary mb-0">
                  Aún no hay categorías.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Productos</th>
                        <th className="text-end">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categorias.map((categoria) => (
                        <tr key={categoria.id}>
                          <td className="fs-4">{categoria.emoji || '🌱'}</td>
                          <td>{categoria.nombre}</td>
                          <td className="text-muted small">
                            {categoria.descripcion}
                          </td>
                          <td>
                            <span className="badge bg-success rounded-pill">
                              {contarProductos(categoria.nombre)}
                            </span>
                          </td>
                          <td className="text-end">
                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() => handleEditar(categoria)}
                            >
                              ✏️ Editar
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleEliminar(categoria)}
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

      </div>
    </div>
  );
}