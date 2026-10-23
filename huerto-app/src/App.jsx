import React, { useState } from 'react';
import ProductCard from './components/ProductCard';
import CartWidget from './components/CartWidget';
import ProductForm from './pages/admin/ProductForm';

export default function App() {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Manzana Orgánica', precio: 1200, imagen: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6' },
    { id: 2, nombre: 'Naranja Fresca', precio: 990, imagen: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b' },
    { id: 3, nombre: 'Espinaca Silvestre', precio: 850, imagen: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb' },
  ]);

  const [carrito, setCarrito] = useState([]);

  const handleAddToCart = (product) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === product.id);
      if (existe) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...product, cantidad: 1 }];
    });
  };

  const handleSaveProduct = (nuevoProducto) => {
    setProductos((prev) => [
      ...prev,
      { ...nuevoProducto, id: Date.now(), imagen: 'https://via.placeholder.com/150' }
    ]);
  };

  return (
    <div className="container py-4">
      <header className="mb-4 pb-2 border-bottom d-flex justify-content-between align-items-center">
        <h1 className="text-success fw-bold">🌱 Huerto Online</h1>
        <span className="badge bg-success fs-6">React + Bootstrap</span>
      </header>

      <div className="row">
        {/* Catálogo de Productos */}
        <div className="col-md-8">
          <h3 className="mb-3">Productos Disponibles</h3>
          <div className="row">
            {productos.map((prod) => (
              <ProductCard key={prod.id} product={prod} onAddToCart={handleAddToCart} />
            ))}
          </div>

          <div className="mt-4">
            <ProductForm onSave={handleSaveProduct} />
          </div>
        </div>

        {/* Carrito de Compras */}
        <div className="col-md-4">
          <CartWidget items={carrito} />
        </div>
      </div>
    </div>
  );
}