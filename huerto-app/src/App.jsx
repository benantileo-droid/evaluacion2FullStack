import React, { useState, useEffect } from 'react';
import ProductForm from './pages/admin/ProductForm';
import { getProductos, crearProducto, actualizarProducto, eliminarProducto,
  getUsuarios, crearUsuario, agregarCompra,
  getCategorias, crearCategoria, actualizarCategoria, eliminarCategoria,
  getOrdenes, crearOrden,
  descontarStock, renombrarCategoriaProductos
} from './data/db';
import { precioFinal } from './utils/precios';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

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
import UsuariosAdmin from './pages/admin/UsuariosAdmin';
import Dashboard from './pages/admin/Dashboard';
import RutaAdmin from './components/RutaAdmin';
import AdminLayout from './pages/admin/AdminLayout';
import Ordenes from './pages/admin/Ordenes';
import BoletaAdmin from './pages/admin/BoletaAdmin';
import AdminProductos from './pages/admin/AdminProductos';
import AdminProductoForm from './pages/admin/AdminProductoForm';
import ProductosCriticos from './pages/admin/ProductosCriticos';
import AdminCategorias from './pages/admin/AdminCategorias';

export default function App() {

  // =========================
  // ESTADOS
  // =========================

  const [productos, setProductos] = useState(getProductos);

  const [categorias, setCategorias] = useState(getCategorias);

  const navigate = useNavigate();

  const location = useLocation();
  const esRutaAdmin = location.pathname.startsWith('/admin');

  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito');

    return carritoGuardado
      ? JSON.parse(carritoGuardado)
      : [];
  });

  // USUARIOS
  const [usuarios, setUsuarios] = useState(getUsuarios);

  const [ordenes, setOrdenes] = useState(getOrdenes);

  const [usuarioActual, setUsuarioActual] = useState(() => {
    const usuarioGuardado = localStorage.getItem('usuarioActual');

    return usuarioGuardado
      ? JSON.parse(usuarioGuardado)
      : null;
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
  if (usuarioActual) {
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
  } else {
    localStorage.removeItem('usuarioActual');
  }
}, [usuarioActual]);

  useEffect(() => {
    localStorage.setItem(
      'carrito',
      JSON.stringify(carrito)
    );
  }, [carrito]);

  


  // =========================
  // USUARIOS
  // =========================

  const handleRegisterUser = (nuevoUsuario) => {
  setUsuarios(crearUsuario(nuevoUsuario));
};
  const handleLogin = (usuario) => {
    setUsuarioActual(usuario);
  };

  

   const handleLogout = () => {
    setUsuarioActual(null);
    setModoAdmin(false);
    setMostrarFormulario(false);
    setProductoEditando(null);
    navigate('/');
  };
    
    const handleCompraExitosa = (orden) => {
    setOrdenes(crearOrden(orden));
    setProductos(descontarStock(orden.productos));

    if (!usuarioActual) return;

    setUsuarios(agregarCompra(usuarioActual.id, orden));

    setUsuarioActual((prev) => ({
      ...prev,
      compras: [...(prev.compras || []), orden]
    }));
  };

  


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
          precio: precioFinal(product),
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
    if (productoEditando) {
      setProductos(actualizarProducto(productoEditando.id, nuevoProducto));
      setProductoEditando(null);
      setMostrarFormulario(false);
      return;
    }

    setProductos(crearProducto(nuevoProducto));
    setMostrarFormulario(false);
  };


  // ELIMINAR PRODUCTO
    const handleDeleteProduct = (id) => {
    setProductos(eliminarProducto(id));
  };

    // ADMIN: productos
  const handleCrearProducto = (datos) => {
    setProductos(crearProducto(datos));
  };

  const handleActualizarProducto = (id, datos) => {
    setProductos(actualizarProducto(id, datos));
  };

  // ADMIN: categorías
  const handleCrearCategoria = (datos) => {
    setCategorias(crearCategoria(datos));
  };

  const handleActualizarCategoria = (id, cambios) => {
    const anterior = categorias.find((c) => c.id === id);

    setCategorias(actualizarCategoria(id, cambios));

    if (anterior && cambios.nombre && cambios.nombre !== anterior.nombre) {
      setProductos(renombrarCategoriaProductos(anterior.nombre, cambios.nombre));
    }
  };

  const handleEliminarCategoria = (id) => {
    setCategorias(eliminarCategoria(id));
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
      {!esRutaAdmin && (
      <footer className="bg-dark text-white py-4 mt-5 d-print-none">
      <nav className="navbar navbar-expand-lg navbar-dark bg-success sticky-top shadow-sm d-print-none ">

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


              {!usuarioActual ? (
  <>
    <Link className="nav-link" to="/registro">Registro</Link>
    <Link className="nav-link text-nowrap" to="/login">Iniciar Sesión</Link>
  </>
) : (
  <>
    <span className="nav-link text-white-50 text-nowrap">
      👤 {usuarioActual.nombre}
    </span>
    <button
      className="btn btn-link nav-link text-nowrap"
      onClick={handleLogout}
    >
      Cerrar sesión
    </button>
  </>
)}


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

              {usuarioActual?.rol === 'admin' && (
  <Link
    to="/admin"
    className="btn btn-outline-light rounded-pill text-nowrap"
  >
    📊 Dashboard
  </Link>
)}


              {usuarioActual?.rol === 'admin' && (
                
                <button
                  className="btn btn-outline-light rounded-pill text-nowrap"
                  onClick={() => {
                    setModoAdmin(!modoAdmin);
                    setMostrarFormulario(false);
                    setProductoEditando(null);
                  }}
                >
                  {modoAdmin ? 'Salir Admin' : '⚙️ Admin'}
                </button>
              )}
              {usuarioActual?.rol === 'admin' && (
  <Link
    to="/admin/usuarios"
    className="btn btn-outline-light rounded-pill text-nowrap"
  >
    👥 Usuarios
  </Link>
)}

            </div>

          </div>

        </div>

      </nav>
      </footer>
      )}


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

              categorias={categorias}

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
              categorias={categorias}
              productos={productos}
              onAddToCart={handleAddToCart}
            />
          }
        />

        <Route
          path="/categorias/:nombre"
          element={
            <Categoria
              categorias={categorias}
              productos={productos}
              onAddToCart={handleAddToCart}
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
      onClearCart={handleClearCart}
      usuarioActual={usuarioActual}
      onCompraExitosa={handleCompraExitosa}
    />
  }
/>
        <Route
          path="/admin"
          element={
            <RutaAdmin usuarioActual={usuarioActual}>
              <AdminLayout
                usuarioActual={usuarioActual}
                onLogout={handleLogout}
              />
            </RutaAdmin>
          }
        >
          <Route
            index
            element={
              <Dashboard
                productos={productos}
                usuarios={usuarios}
                ordenes={ordenes}
              />
            }
          />
          <Route path="ordenes" element={<Ordenes ordenes={ordenes} />} />
          <Route
            path="ordenes/:numero"
            element={<BoletaAdmin ordenes={ordenes} />}
          />
          <Route
            path="usuarios"
            element={<UsuariosAdmin usuarios={usuarios} />}
          />
        

        <Route
            path="productos"
            element={
              <AdminProductos
                productos={productos}
                onDelete={handleDeleteProduct}
              />
            }
          />
          <Route
            path="productos/nuevo"
            element={
              <AdminProductoForm
                productos={productos}
                categorias={categorias}
                onCreate={handleCrearProducto}
                onUpdate={handleActualizarProducto}
              />
            }
          />
          <Route
            path="productos/:id/editar"
            element={
              <AdminProductoForm
                productos={productos}
                categorias={categorias}
                onCreate={handleCrearProducto}
                onUpdate={handleActualizarProducto}
              />
            }
          />
          <Route
            path="productos-criticos"
            element={<ProductosCriticos productos={productos} />}
          />
          <Route
            path="categorias"
            element={
              <AdminCategorias
                categorias={categorias}
                productos={productos}
                onCreate={handleCrearCategoria}
                onUpdate={handleActualizarCategoria}
                onDelete={handleEliminarCategoria}
              />
            }
          />
        </Route>


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
            <Registro
              onRegister={handleRegisterUser}
              usuarios={usuarios}
            />
          }
        />


        {/* LOGIN */}

        <Route
          path="/login"
          element={
            <Login
              usuarios={usuarios}
              onLogin={handleLogin}
            />
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
                onSave={handleSaveProduct}
                productoEditando={productoEditando}
                categorias={categorias}
              />

            </div>

          </div>

        </div>

      )}


      {/* ========================= */}
      {/* FOOTER */}
      {/* ========================= */}

      <footer className="bg-dark text-white py-4 mt-5 d-print-none">

        <div className="container text-center">

          <p className="m-0 fw-light">

            🌱 <strong>Huerto Hogar</strong> - Evaluación FullStack DSY1104 | Duoc UC

          </p>

          <small className="text-secondary">

            Desarrollado con React, Bootstrap, Jasmine y Karma

          </small>

        </div>

      </footer>


    </div>
  );
}