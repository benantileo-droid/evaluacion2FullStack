import React, { useState } from 'react';
import ProductCard from './components/ProductCard';
import CartWidget from './components/CartWidget';
import ProductForm from './pages/admin/ProductForm';
import { initialProducts } from "./data/productos";

export default function app(){
const [productos, setProductos] = useState(initialProducts);
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

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
      { ...nuevoProducto, id: Date.now(), categoria: 'General', descripcion: 'Producto recién agregado al catálogo.', imagen: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400' }
    ]);
  };

  const productosFiltrados = productos.filter((prod) => {
    const coincideNombre = prod.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaSeleccionada === 'Todas' || prod.categoria === categoriaSeleccionada;
    return coincideNombre && coincideCategoria;
  });

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* 1. NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success sticky-top shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold fs-3 text-white d-flex align-items-center gap-2" href="#">
            🌱 Huerto Hogar
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="mx-auto my-2 my-lg-0 w-50">
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder="🔍 Buscar frutas, verduras..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            
            <button 
              className="btn btn-outline-light rounded-pill ms-lg-2"
              onClick={() => setMostrarFormulario(!mostrarFormulario)}
            >
              {mostrarFormulario ? ' Ver Catálogo' : '⚙️ Admin Productos'}
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO BANNER */}
      {!mostrarFormulario && (
        <div className="bg-success text-white py-5 mb-4 shadow-sm" style={{ background: 'linear-gradient(135deg, #198754 0%, #146c43 100%)' }}>
          <div className="container text-center py-3">
            <h1 className="display-4 fw-bold">Productos Orgánicos Directo a tu Mesa</h1>
            <p className="lead">Cosecha fresca del día, cultivada con procesos sustentables y libres de químicos.</p>
            <div className="d-flex justify-content-center gap-2 mt-3">
              {['Todas', 'Frutas', 'Verduras'].map((cat) => (
                <button
                  key={cat}
                  className={`btn rounded-pill px-4 ${categoriaSeleccionada === cat ? 'btn-light text-success fw-bold' : 'btn-outline-light'}`}
                  onClick={() => setCategoriaSeleccionada(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. CONTENIDO PRINCIPAL */}
      <div className="container my-4 flex-grow-1">
        {mostrarFormulario ? (
          <div className="row justify-content-center">
            <div className="col-md-8">
              <ProductForm onSave={handleSaveProduct} />
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {/* Lista de Productos */}
            <div className="col-lg-8">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="fw-bold text-success m-0">Catálogo ({productosFiltrados.length})</h3>
              </div>

              {productosFiltrados.length === 0 ? (
                <div className="alert alert-warning text-center my-4">
                  No se encontraron productos que coincidan con tu búsqueda.
                </div>
              ) : (
                <div className="row">
                  {productosFiltrados.map((prod) => (
                    <ProductCard key={prod.id} product={prod} onAddToCart={handleAddToCart} />
                  ))}
                </div>
              )}
            </div>

            {/* Widget del Carrito */}
            <div className="col-lg-4">
              <div className="sticky-top" style={{ top: '90px' }}>
                <CartWidget items={carrito} />
              </div>
            </div>
          </div>
        )}
      </div>

     {/* 4. FOOTER */}
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container text-center">
          <p className="m-0 fw-light">🌱 <strong>Huerto Hogar</strong> - Evaluación FullStack DSY1104 | Duoc UC</p>
          <small className="text-secondary">Desarrollado con React, Bootstrap y Vitest</small>
        </div>
      </footer>
    </div>
  );
}