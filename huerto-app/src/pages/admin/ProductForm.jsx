import React, { useState, useEffect } from 'react';

export default function ProductForm({ onSave, productoEditando }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
useEffect(() => {
  if (productoEditando) {
    setNombre(productoEditando.nombre);
    setPrecio(productoEditando.precio);
  } else {
    setNombre('');
    setPrecio('');
  }
}, [productoEditando]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ nombre, precio: parseFloat(precio) });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
      <h4 className="mb-3">Administrar Producto</h4>
      <div className="mb-3">
        <label htmlFor="nombreInput" className="form-label">Nombre del Producto</label>
        <input 
          type="text" 
          id="nombreInput" 
          className="form-control" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          required 
        />
      </div>
      <div className="mb-3">
        <label htmlFor="precioInput" className="form-label">Precio ($)</label>
        <input 
          type="number" 
          id="precioInput" 
          className="form-control" 
          value={precio} 
          onChange={(e) => setPrecio(e.target.value)} 
          required 
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">Guardar Producto</button>
    </form>
  );
}