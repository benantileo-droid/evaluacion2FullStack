import { initialProducts } from './productos';
import { initialUsers } from './usuarios';
import { initialCategories } from './categorias';
// =========================
// HELPERS DE PERSISTENCIA
// =========================

const leer = (clave, valorInicial) => {
  try {
    const guardado = localStorage.getItem(clave);
    return guardado ? JSON.parse(guardado) : valorInicial;
  } catch {
    return valorInicial;
  }
};

const guardar = (clave, datos) => {
  localStorage.setItem(clave, JSON.stringify(datos));
  return datos;
};

// =========================
// PRODUCTOS (CRUD)
// =========================

export const getProductos = () => leer('productos', initialProducts);

export const getProductoPorId = (id) =>
  getProductos().find((p) => p.id === Number(id));

export const crearProducto = (producto) =>
  guardar('productos', [
    ...getProductos(),
    { ...producto, id: Date.now() }
  ]);

export const actualizarProducto = (id, cambios) =>
  guardar(
    'productos',
    getProductos().map((p) =>
      p.id === id ? { ...p, ...cambios, id } : p
    )
  );

export const eliminarProducto = (id) =>
  guardar(
    'productos',
    getProductos().filter((p) => p.id !== id)
  );

// =========================
// USUARIOS (CRUD)
// =========================

export const getUsuarios = () => leer('usuarios', initialUsers);

export const getUsuarioPorId = (id) =>
  getUsuarios().find((u) => u.id === Number(id));

export const crearUsuario = (usuario) =>
  guardar('usuarios', [
    ...getUsuarios(),
    { rol: 'cliente', compras: [], ...usuario, id: Date.now() }
  ]);

export const actualizarUsuario = (id, cambios) =>
  guardar(
    'usuarios',
    getUsuarios().map((u) =>
      u.id === id ? { ...u, ...cambios, id } : u
    )
  );

export const eliminarUsuario = (id) =>
  guardar(
    'usuarios',
    getUsuarios().filter((u) => u.id !== id)
  );

// Agrega una orden al historial de compras de un usuario
export const agregarCompra = (idUsuario, orden) =>
  guardar(
    'usuarios',
    getUsuarios().map((u) =>
      u.id === idUsuario
        ? { ...u, compras: [...(u.compras || []), orden] }
        : u
    )
  );
// =========================
// CATEGORÍAS (CRUD)
// =========================

export const getCategorias = () => leer('categorias', initialCategories);

export const crearCategoria = (categoria) =>
  guardar('categorias', [
    ...getCategorias(),
    { ...categoria, id: Date.now() }
  ]);

export const actualizarCategoria = (id, cambios) =>
  guardar(
    'categorias',
    getCategorias().map((c) =>
      c.id === id ? { ...c, ...cambios, id } : c
    )
  );

export const eliminarCategoria = (id) =>
  guardar(
    'categorias',
    getCategorias().filter((c) => c.id !== id)
  );