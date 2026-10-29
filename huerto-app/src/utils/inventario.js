export const STOCK_CRITICO = 5;

export const esStockCritico = (producto) =>
  typeof producto.stock === 'number' && producto.stock <= STOCK_CRITICO;