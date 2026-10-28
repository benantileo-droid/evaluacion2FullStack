import React, { useState, useEffect } from 'react';

export default function ProductForm({ onSave, productoEditando }) {

  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('Frutas');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');

  // Si estamos editando, carga los datos del producto
  useEffect(() => {

    if (productoEditando) {

      setNombre(productoEditando.nombre);
      setPrecio(productoEditando.precio);
      setCategoria(productoEditando.categoria);
      setDescripcion(productoEditando.descripcion);
      setImagen(productoEditando.imagen);

    } else {

      // Si estamos creando, deja el formulario vacío
      setNombre('');
      setPrecio('');
      setCategoria('Frutas');
      setDescripcion('');
      setImagen('');
    }

  }, [productoEditando]);


  const handleSubmit = (e) => {

    e.preventDefault();

    onSave({
      nombre,
      precio: parseFloat(precio),
      categoria,
      descripcion,
      imagen
    });
  };


  return (

    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-3 shadow-sm bg-white"
    >

      <h4 className="mb-4 text-success fw-bold">
        {productoEditando
          ? '✏️ Editar Producto'
          : '➕ Nuevo Producto'}
      </h4>


      {/* NOMBRE */}

      <div className="mb-3">

        <label
          htmlFor="nombreInput"
          className="form-label fw-semibold"
        >
          Nombre del producto
        </label>

        <input
          type="text"
          id="nombreInput"
          className="form-control"
          value={nombre}
          onChange={(e) =>
            setNombre(e.target.value)
          }
          required
        />

      </div>


      {/* PRECIO */}

      <div className="mb-3">

        <label
          htmlFor="precioInput"
          className="form-label fw-semibold"
        >
          Precio ($)
        </label>

        <input
          type="number"
          id="precioInput"
          className="form-control"
          value={precio}
          onChange={(e) =>
            setPrecio(e.target.value)
          }
          min="1"
          required
        />

      </div>


      {/* CATEGORÍA */}

      <div className="mb-3">

        <label
          htmlFor="categoriaInput"
          className="form-label fw-semibold"
        >
          Categoría
        </label>

        <select
          id="categoriaInput"
          className="form-select"
          value={categoria}
          onChange={(e) =>
            setCategoria(e.target.value)
          }
        >

          <option value="Frutas">
            Frutas
          </option>

          <option value="Verduras">
            Verduras
          </option>

        </select>

      </div>


      {/* DESCRIPCIÓN */}

      <div className="mb-3">

        <label
          htmlFor="descripcionInput"
          className="form-label fw-semibold"
        >
          Descripción
        </label>

        <textarea
          id="descripcionInput"
          className="form-control"
          rows="3"
          value={descripcion}
          onChange={(e) =>
            setDescripcion(e.target.value)
          }
          required
        />

      </div>


      {/* IMAGEN */}

      <div className="mb-4">

        <label
          htmlFor="imagenInput"
          className="form-label fw-semibold"
        >
          URL de la imagen
        </label>

        <input
          type="text"
          id="imagenInput"
          className="form-control"
          placeholder="https://..."
          value={imagen}
          onChange={(e) =>
            setImagen(e.target.value)
          }
          required
        />

      </div>


      {/* BOTÓN GUARDAR */}

      <button
        type="submit"
        className="btn btn-success w-100 fw-semibold"
      >

        {productoEditando
          ? 'Guardar Cambios'
          : 'Crear Producto'}

      </button>

    </form>
  );
}