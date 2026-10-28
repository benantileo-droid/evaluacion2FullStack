import React, { useState, useEffect } from 'react';
import ProductForm from './pages/admin/ProductForm';
import { initialProducts } from './data/productos';
import { Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Productos from './pages/Productos';
import Categoria from './pages/Categoria';
import Ofertas from './pages/Ofertas';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import CompraExitosa from './pages/CompraExitosa';
import CompraFallida from './pages/CompraFallida';
import ProductDetail from './components/ProductDetail';
import Registro from './pages/Registro';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Blog from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';

export default function App() {
  const [productos, setProductos] = useState(() => {
    const productosGuardados = localStorage.getItem('productos');

    return productosGuardados
      ? JSON.parse(productosGuardados)
      : initialProducts;
  });

  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState('Todas');

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [modoAdmin, setModoAdmin] = useState(false);

  // Guardar productos en localStorage
  useEffect(() => {
    localStorage.setItem(
      'productos',
      JSON.stringify(productos)
    );
  }, [productos]);

  // Agregar producto al carrito
  const handleAddToCart = (product) => {
    setCarrito((prev) => {
      const existe = prev.find(
        (item) => item.id === product.id
      );

      if (existe) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          cantidad: 1,
        },
      ];
    });
  };

  // Vaciar carrito
  const handleClearCart = () => {
    setCarrito([]);
  };

  // Eliminar producto del carrito
  const handleRemoveFromCart = (id) => {
    setCarrito((prev) =>
      prev.filter(
        (producto) => producto.id !== id
      )
    );
  };

  // Aumentar cantidad
  const handleIncreaseQuantity = (id) => {
    setCarrito((prev) =>
      prev.map((producto) =>
        producto.id === id
          ? {
              ...producto,
              cantidad: producto.cantidad + 1,
            }
          : producto
      )
    );
  };

  // Disminuir cantidad
  const handleDecreaseQuantity = (id) => {
    setCarrito((prev) =>
      prev
        .map((producto) =>
          producto.id === id
            ? {
                ...producto,
                cantidad: producto.cantidad - 1,
              }
            : producto
        )
        .filter(
          (producto) => producto.cantidad > 0
        )
    );
  };

  // Guardar producto nuevo o producto editado
  const handleSaveProduct = (nuevoProducto) => {
    // Si hay un producto seleccionado,
    // significa que estamos editando
    if (productoEditando) {
      setProductos((prev) =>
        prev.map((producto) =>
          producto.id === productoEditando.id
            ? {
                ...producto,
                ...nuevoProducto,
              }
            : producto
        )
      );

      setProductoEditando(null);
      setMostrarFormulario(false);
      return;
    }

    // Si no estamos editando,
    // creamos un producto nuevo
    setProductos((prev) => [
      ...prev,
      {
        ...nuevoProducto,
        id: Date.now(),
        categoria: 'General',
        descripcion:
          'Producto recién agregado al catálogo.',
        imagen:
          'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400',
      },
    ]);

    setMostrarFormulario(false);
  };

  // Eliminar producto del catálogo
  const handleDeleteProduct = (id) => {
    setProductos((prev) =>
      prev.filter(
        (producto) => producto.id !== id
      )
    );
  };

  // Editar producto
  const handleEditProduct = (producto) => {
    setProductoEditando(producto);
    setMostrarFormulario(true);

    // Baja automáticamente hasta el formulario
    setTimeout(() => {
      document
        .getElementById('formulario-admin')
        ?.scrollIntoView({
          behavior: 'smooth',
        });
    }, 100);
  };

  // Crear producto nuevo
  const handleNewProduct = () => {
    setProductoEditando(null);
    setMostrarFormulario(true);

    // Baja automáticamente hasta el formulario
    setTimeout(() => {
      document
        .getElementById('formulario-admin')
        ?.scrollIntoView({
          behavior: 'smooth',
        });
    }, 100);
  };

  // Filtrar productos
  const productosFiltrados = productos.filter(
    (prod) => {
      const coincideNombre = prod.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase());

      const coincideCategoria =
        categoriaSeleccionada === 'Todas' ||
        prod.categoria === categoriaSeleccionada;

      return (
        coincideNombre &&
        coincideCategoria
      );
    }
  );

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success sticky-top shadow-sm">
        <div className="container">

          <Link
            className="navbar-brand fw-bold fs-3 text-white d-flex align-items-center gap-2"
            to="/"
          >
            🌱 Huerto Hogar
          </Link>

          <div className="d-none d-lg-flex gap-3 ms-4">

            <Link
              className="text-white text-decoration-none fw-semibold"
              to="/"
            >
              Inicio
            </Link>

            <Link
              className="text-white text-decoration-none fw-semibold"
              to="/registro"
            >
              Registro
            </Link>

            <Link
              className="text-white text-decoration-none fw-semibold"
              to="/blog"
            >
              Blog
            </Link>

            <Link
              className="text-white text-decoration-none fw-semibold"
              to="/nosotros"
            >
              Nosotros
            </Link>

            <Link
              className="text-white text-decoration-none fw-semibold"
              to="/contacto"
            >
              Contacto
            </Link>

            <Link
              className="text-white text-decoration-none fw-semibold"
              to="/productos"
            >
              Productos
            </Link>

            <Link
              className="text-white text-decoration-none fw-semibold"
              to="/categorias"
            >
              Categorías
            </Link>

            <Link
              className="text-white text-decoration-none fw-semibold"
              to="/ofertas"
            >
              Ofertas
            </Link>

            <Link
              className="text-white text-decoration-none fw-semibold"
              to="/carrito"
            >
              🛒 Carrito ({carrito.length})
            </Link>

          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="navbarNav"
          >

            <div className="mx-auto my-2 my-lg-0 w-50">
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder="🔍 Buscar frutas, verduras..."
                value={busqueda}
                onChange={(e) =>
                  setBusqueda(e.target.value)
                }
              />
            </div>

            <button
              className="btn btn-outline-light rounded-pill ms-lg-2"
              onClick={() => {
                setModoAdmin(!modoAdmin);
                setMostrarFormulario(false);
                setProductoEditando(null);
              }}
            >
              {modoAdmin
                ? 'Salir Admin'
                : '⚙️ Admin Productos'}
            </button>

          </div>
        </div>
      </nav>

      {/* RUTAS */}
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/productos"
          element={
            <Productos
              productos={productos}
              productosFiltrados={productosFiltrados}
              categoriaSeleccionada={
                categoriaSeleccionada
              }
              setCategoriaSeleccionada={
                setCategoriaSeleccionada
              }
              onAddToCart={handleAddToCart}
              onDelete={handleDeleteProduct}
              onEdit={handleEditProduct}
              modoAdmin={modoAdmin}
              onNewProduct={handleNewProduct}
            />
          }
        />

        <Route
          path="/categorias"
          element={
            <Categoria
              setCategoriaSeleccionada={
                setCategoriaSeleccionada
              }
            />
          }
        />

        <Route
          path="/ofertas"
          element={
            <Ofertas
              productos={productos}
              onAddToCart={handleAddToCart}
            />
          }
        />

        <Route
          path="/carrito"
          element={
            <Carrito
              carrito={carrito}
              onRemove={handleRemoveFromCart}
              onIncrease={handleIncreaseQuantity}
              onDecrease={handleDecreaseQuantity}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              carrito={carrito}
              onClearCart={handleClearCart}
            />
          }
        />

        <Route
          path="/compra-exitosa"
          element={<CompraExitosa />}
        />

        <Route
          path="/compra-fallida"
          element={<CompraFallida />}
        />

        <Route
          path="/productos/:id"
          element={
            <ProductDetail
              productos={productos}
              onAddToCart={handleAddToCart}
            />
          }
        />

        <Route
          path="/registro"
          element={<Registro />}
        />

        <Route
          path="/nosotros"
          element={<Nosotros />}
        />

        <Route
          path="/contacto"
          element={<Contacto />}
        />

        <Route
          path="/blog"
          element={<Blog />}
        />

        <Route
          path="/blog/:id"
          element={<BlogDetail />}
        />

      </Routes>

      {/* FORMULARIO DEL ADMIN */}
      {mostrarFormulario && (
        <div
          id="formulario-admin"
          className="container my-4 flex-grow-1"
        >
          <div className="row justify-content-center">
            <div className="col-md-8">

              <ProductForm
                onSave={handleSaveProduct}
                productoEditando={
                  productoEditando
                }
              />

            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container text-center">

          <p className="m-0 fw-light">
            🌱 <strong>Huerto Hogar</strong> -
            Evaluación FullStack DSY1104 | Duoc UC
          </p>

          <small className="text-secondary">
            Desarrollado con React, Bootstrap y Vitest
          </small>

        </div>
      </footer>

    </div>
  );
}