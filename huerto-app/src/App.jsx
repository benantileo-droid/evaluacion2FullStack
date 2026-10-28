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
import Login from './pages/Login';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Blog from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';

export default function App() {

  // =========================
  // ESTADOS
  // =========================

  const [productos, setProductos] = useState(() => {
    const productosGuardados = localStorage.getItem('productos');

    return productosGuardados
      ? JSON.parse(productosGuardados)
      : initialProducts;
  });

  const [carrito, setCarrito] = useState(() => {
  const carritoGuardado = localStorage.getItem('carrito');

  return carritoGuardado
    ? JSON.parse(carritoGuardado)
    : [];
});
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState('Todas');

  const [mostrarFormulario, setMostrarFormulario] =
    useState(false);

  const [productoEditando, setProductoEditando] =
    useState(null);

  const [modoAdmin, setModoAdmin] =
    useState(false);


  // =========================
  // LOCAL STORAGE
  // =========================

  useEffect(() => {
    localStorage.setItem(
      'productos',
      JSON.stringify(productos)
    );
  }, [productos]);

  useEffect(() => {
  localStorage.setItem(
    'carrito',
    JSON.stringify(carrito)
  );
}, [carrito]);


  // =========================
  // CARRITO
  // =========================

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


  const handleClearCart = () => {
    setCarrito([]);
  };


  const handleRemoveFromCart = (id) => {

    setCarrito((prev) =>
      prev.filter(
        (producto) => producto.id !== id
      )
    );
  };


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


  // =========================
  // ADMIN / CRUD
  // =========================

  const handleSaveProduct = (nuevoProducto) => {

    // EDITAR PRODUCTO
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


    // CREAR PRODUCTO
    // Los datos vienen directamente desde ProductForm:
    // nombre, precio, categoria, descripcion e imagen

    setProductos((prev) => [
      ...prev,
      {
        ...nuevoProducto,
        id: Date.now(),
      },
    ]);

    setMostrarFormulario(false);
  };


  // ELIMINAR PRODUCTO
  const handleDeleteProduct = (id) => {

    setProductos((prev) =>
      prev.filter(
        (producto) => producto.id !== id
      )
    );
  };


  // EDITAR PRODUCTO
  const handleEditProduct = (producto) => {

    setProductoEditando(producto);
    setMostrarFormulario(true);

    setTimeout(() => {

      document
        .getElementById('formulario-admin')
        ?.scrollIntoView({
          behavior: 'smooth',
        });

    }, 100);
  };


  // NUEVO PRODUCTO
  const handleNewProduct = () => {

    setProductoEditando(null);
    setMostrarFormulario(true);

    setTimeout(() => {

      document
        .getElementById('formulario-admin')
        ?.scrollIntoView({
          behavior: 'smooth',
        });

    }, 100);
  };


  // =========================
  // FILTRO DE PRODUCTOS
  // =========================

  const productosFiltrados = productos.filter(
    (prod) => {

      const coincideNombre =
        prod.nombre
          .toLowerCase()
          .includes(
            busqueda.toLowerCase()
          );

      const coincideCategoria =
        categoriaSeleccionada === 'Todas' ||
        prod.categoria === categoriaSeleccionada;

      return (
        coincideNombre &&
        coincideCategoria
      );
    }
  );


  // =========================
  // INTERFAZ
  // =========================

  return (

    <div className="bg-light min-vh-100 d-flex flex-column">


      {/* ========================= */}
      {/* NAVBAR */}
      {/* ========================= */}

      <nav className="navbar navbar-expand-lg navbar-dark bg-success sticky-top shadow-sm">

        <div className="container-fluid px-4">


          {/* LOGO */}

          <Link
            className="navbar-brand fw-bold fs-4 me-4"
            to="/"
          >
            🌱 Huerto Hogar
          </Link>


          {/* BOTÓN HAMBURGUESA */}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Abrir menú"
          >
            <span className="navbar-toggler-icon"></span>
          </button>


          {/* MENÚ */}

          <div
            className="collapse navbar-collapse"
            id="navbarNav"
          >


            {/* LINKS */}

            <div className="navbar-nav me-auto align-items-lg-center">

              <Link
                className="nav-link"
                to="/"
              >
                Inicio
              </Link>


              <Link
                className="nav-link"
                to="/productos"
              >
                Productos
              </Link>


              <Link
                className="nav-link"
                to="/categorias"
              >
                Categorías
              </Link>


              <Link
                className="nav-link"
                to="/ofertas"
              >
                Ofertas
              </Link>


              <Link
                className="nav-link"
                to="/blog"
              >
                Blog
              </Link>


              <Link
                className="nav-link"
                to="/nosotros"
              >
                Nosotros
              </Link>


              <Link
                className="nav-link"
                to="/contacto"
              >
                Contacto
              </Link>


              <Link
                className="nav-link"
                to="/registro"
              >
                Registro
              </Link>


              <Link
                className="nav-link text-nowrap"
                to="/login"
              >
                Iniciar Sesión
              </Link>


              <Link
                className="nav-link text-nowrap"
                to="/carrito"
              >
                🛒 ({carrito.length})
              </Link>

            </div>


            {/* BUSCADOR + ADMIN */}

            <div className="d-flex flex-column flex-xl-row gap-2 my-2 my-lg-0">

              <input
                type="text"
                className="form-control rounded-pill"
                placeholder="🔍 Buscar..."
                value={busqueda}
                onChange={(e) =>
                  setBusqueda(e.target.value)
                }
              />


              <button
                className="btn btn-outline-light rounded-pill text-nowrap"
                onClick={() => {

                  setModoAdmin(!modoAdmin);

                  setMostrarFormulario(false);

                  setProductoEditando(null);
                }}
              >

                {modoAdmin
                  ? 'Salir Admin'
                  : '⚙️ Admin'}

              </button>

            </div>

          </div>

        </div>

      </nav>


      {/* ========================= */}
      {/* RUTAS */}
      {/* ========================= */}

      <Routes>


        {/* INICIO */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* PRODUCTOS */}

        <Route
          path="/productos"
          element={
            <Productos

              productos={productos}

              productosFiltrados={
                productosFiltrados
              }

              categoriaSeleccionada={
                categoriaSeleccionada
              }

              setCategoriaSeleccionada={
                setCategoriaSeleccionada
              }

              onAddToCart={
                handleAddToCart
              }

              onDelete={
                handleDeleteProduct
              }

              onEdit={
                handleEditProduct
              }

              modoAdmin={
                modoAdmin
              }

              onNewProduct={
                handleNewProduct
              }

            />
          }
        />


        {/* CATEGORÍAS */}

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


        {/* OFERTAS */}

        <Route
          path="/ofertas"
          element={
            <Ofertas
              productos={productos}
              onAddToCart={
                handleAddToCart
              }
            />
          }
        />


        {/* CARRITO */}

        <Route
          path="/carrito"
          element={
            <Carrito

              carrito={carrito}

              onRemove={
                handleRemoveFromCart
              }

              onIncrease={
                handleIncreaseQuantity
              }

              onDecrease={
                handleDecreaseQuantity
              }

            />
          }
        />


        {/* CHECKOUT */}

        <Route
          path="/checkout"
          element={
            <Checkout

              carrito={carrito}

              onClearCart={
                handleClearCart
              }

            />
          }
        />


        {/* COMPRA EXITOSA */}

        <Route
          path="/compra-exitosa"
          element={
            <CompraExitosa />
          }
        />


        {/* COMPRA FALLIDA */}

        <Route
          path="/compra-fallida"
          element={
            <CompraFallida />
          }
        />


        {/* DETALLE PRODUCTO */}

        <Route
          path="/productos/:id"
          element={
            <ProductDetail

              productos={productos}

              onAddToCart={
                handleAddToCart
              }

            />
          }
        />


        {/* REGISTRO */}

        <Route
          path="/registro"
          element={
            <Registro />
          }
        />


        {/* LOGIN */}

        <Route
          path="/login"
          element={
            <Login />
          }
        />


        {/* NOSOTROS */}

        <Route
          path="/nosotros"
          element={
            <Nosotros />
          }
        />


        {/* CONTACTO */}

        <Route
          path="/contacto"
          element={
            <Contacto />
          }
        />


        {/* BLOG */}

        <Route
          path="/blog"
          element={
            <Blog />
          }
        />


        {/* DETALLE BLOG */}

        <Route
          path="/blog/:id"
          element={
            <BlogDetail />
          }
        />


      </Routes>


      {/* ========================= */}
      {/* FORMULARIO ADMIN */}
      {/* ========================= */}

      {mostrarFormulario && (

        <div
          id="formulario-admin"
          className="container my-4 flex-grow-1"
        >

          <div className="row justify-content-center">

            <div className="col-md-8">

              <ProductForm

                onSave={
                  handleSaveProduct
                }

                productoEditando={
                  productoEditando
                }

              />

            </div>

          </div>

        </div>

      )}


      {/* ========================= */}
      {/* FOOTER */}
      {/* ========================= */}

      <footer className="bg-dark text-white py-4 mt-5">

        <div className="container text-center">

          <p className="m-0 fw-light">

            🌱 <strong>Huerto Hogar</strong> - Evaluación FullStack DSY1104 | Duoc UC

          </p>

          <small className="text-secondary">

            Desarrollado con React, Bootstrap y Vitest

          </small>

        </div>

      </footer>


    </div>
  );
}