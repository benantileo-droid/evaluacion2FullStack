import React, { useState, useEffect } from 'react';

const CATEGORIAS_POR_DEFECTO = [
  { id: 1, nombre: 'Frutas' },
  { id: 2, nombre: 'Verduras' }
];

const formularioVacio = (categoria) => ({
  nombre: '',
  precio: '',
  categoria,
  descripcion: '',
  imagen: '',
  oferta: false,
  descuento: 20
});

export default function ProductForm({
  onSave,
  productoEditando,
  categorias = CATEGORIAS_POR_DEFECTO
}) {
  const categoriaInicial = categorias[0]?.nombre || 'Frutas';

  const [datos, setDatos] = useState(formularioVacio(categoriaInicial));

  // Si estamos editando, carga los datos del producto
  useEffect(() => {
    if (productoEditando) {
      setDatos({
        nombre: productoEditando.nombre,
        precio: productoEditando.precio,
        categoria: productoEditando.categoria,
        descripcion: productoEditando.descripcion,
        imagen: productoEditando.imagen,
        oferta: Boolean(productoEditando.oferta),
        descuento: productoEditando.descuento || 20
      });
    } else {
      setDatos(formularioVacio(categoriaInicial));
    }
  }, [productoEditando]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setDatos((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      nombre: datos.nombre,
      precio: parseFloat(datos.precio),
      categoria: datos.categoria,
      descripcion: datos.descripcion,
      imagen: datos.imagen,
      oferta: datos.oferta,
      descuento: datos.oferta ? Number(datos.descuento) : 0
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-3 shadow-sm bg-white"
    >
      <h4 className="mb-4 text-success fw-bold">
        {productoEditando ? '✏️ Editar Producto' : '➕ Nuevo Producto'}
      </h4>

      {/* NOMBRE */}
      <div className="mb-3">
        <label htmlFor="nombreInput" className="form-label fw-semibold">
          Nombre del producto
        </label>
        <input
          type="text"
          id="nombreInput"
          name="nombre"
          className="form-control"
          value={datos.nombre}
          onChange={handleChange}
          required
        />
      </div>

      {/* PRECIO */}
      <div className="mb-3">
        <label htmlFor="precioInput" className="form-label fw-semibold">
          Precio ($)
        </label>
        <input
          type="number"
          id="precioInput"
          name="precio"
          className="form-control"
          value={datos.precio}
          onChange={handleChange}
          min="1"
          required
        />
      </div>

      {/* CATEGORÍA */}
      <div className="mb-3">
        <label htmlFor="categoriaInput" className="form-label fw-semibold">
          Categoría
        </label>
        <select
          id="categoriaInput"
          name="categoria"
          className="form-select"
          value={datos.categoria}
          onChange={handleChange}
        >
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.nombre}>
              {cat.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* DESCRIPCIÓN */}
      <div className="mb-3">
        <label htmlFor="descripcionInput" className="form-label fw-semibold">
          Descripción
        </label>
        <textarea
          id="descripcionInput"
          name="descripcion"
          className="form-control"
          rows="3"
          value={datos.descripcion}
          onChange={handleChange}
          required
        />
      </div>

      {/* IMAGEN */}
      <div className="mb-3">
        <label htmlFor="imagenInput" className="form-label fw-semibold">
          URL de la imagen
        </label>
        <input
          type="text"
          id="imagenInput"
          name="imagen"
          className="form-control"
          placeholder="https://..."
          value={datos.imagen}
          onChange={handleChange}
          required
        />
      </div>

      {/* OFERTA */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          id="ofertaInput"
          name="oferta"
          className="form-check-input"
          checked={datos.oferta}
          onChange={handleChange}
        />
        <label htmlFor="ofertaInput" className="form-check-label fw-semibold">
          Producto en oferta
        </label>
      </div>

      {datos.oferta && (
        <div className="mb-4">
          <label htmlFor="descuentoInput" className="form-label fw-semibold">
            Descuento (%)
          </label>
          <input
            type="number"
            id="descuentoInput"
            name="descuento"
            className="form-control"
            value={datos.descuento}
            onChange={handleChange}
            min="1"
            max="90"
            required
          />
        </div>
      )}

      <button type="submit" className="btn btn-success w-100 fw-semibold">
        {productoEditando ? 'Guardar Cambios' : 'Crear Producto'}
      </button>
    </form>
  );
}