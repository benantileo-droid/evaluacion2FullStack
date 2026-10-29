export const estaEnOferta = (producto) =>
  Boolean(producto.oferta) && Number(producto.descuento) > 0;

export const precioFinal = (producto) =>
  estaEnOferta(producto)
    ? Math.round(producto.precio * (1 - Number(producto.descuento) / 100))
    : producto.precio;