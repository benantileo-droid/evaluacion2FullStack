import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import CartWidget from '../components/CartWidget';
import ProductForm from '../pages/admin/ProductForm';
import ProductDetail from '../components/ProductDetail';

// ------------------------------------------------------------------
// 1. PRODUCT CARD (3 Pruebas)
// ------------------------------------------------------------------
describe('Pruebas del Componente ProductCard (Jasmine)', () => {
  let mockProduct;
  let mockAddToCartSpy;

  beforeEach(() => {
    mockProduct = { id: 1, nombre: 'Manzana Orgánica', precio: 1200, imagen: 'manzana.jpg' };
    mockAddToCartSpy = jasmine.createSpy('addToCart');
  });

  it('1. Debe mostrar el nombre y precio del producto en el DOM', () => {
    const { getByText } = render(<ProductCard product={mockProduct} onAddToCart={mockAddToCartSpy} />);
    expect(getByText('Manzana Orgánica')).toBeTruthy();
    expect(getByText('$1200')).toBeTruthy();
  });

  it('2. Debe invocar la función al hacer clic en Agregar al Carrito', () => {
    const { getByRole } = render(<ProductCard product={mockProduct} onAddToCart={mockAddToCartSpy} />);
    const btn = getByRole('button', { name: /agregar/i });
    fireEvent.click(btn);
    expect(mockAddToCartSpy).toHaveBeenCalledWith(mockProduct);
  });

  it('3. Debe registrar exactamente 1 interacción por clic con Jasmine Spy', () => {
    const { getByRole } = render(<ProductCard product={mockProduct} onAddToCart={mockAddToCartSpy} />);
    const btn = getByRole('button', { name: /agregar/i });
    fireEvent.click(btn);
    expect(mockAddToCartSpy.calls.count()).toBe(1);
  });
});

// ------------------------------------------------------------------
// 2. CART WIDGET (3 Pruebas)
// ------------------------------------------------------------------
describe('Pruebas del Componente CartWidget (Jasmine)', () => {
  let mockItems;

  beforeEach(() => {
    mockItems = [
      { id: 1, nombre: 'Manzana', precio: 1000, cantidad: 2 },
      { id: 2, nombre: 'Naranja', precio: 1500, cantidad: 1 }
    ];
  });

  it('4. Debe calcular la suma total de unidades en el carrito', () => {
    const totalCantidad = mockItems.reduce((acc, i) => acc + i.cantidad, 0);
    expect(totalCantidad).toBe(3);
  });

  it('5. Debe calcular el monto total acumulado a pagar', () => {
    const totalMonto = mockItems.reduce((acc, i) => acc + (i.precio * i.cantidad), 0);
    expect(totalMonto).toBe(3500);
  });

  it('6. Debe mostrar mensaje de carrito vacío cuando la lista es nula', () => {
    const { getByText } = render(<CartWidget items={[]} />);
    expect(getByText(/tu carrito está vacío/i)).toBeTruthy();
  });
});

// ------------------------------------------------------------------
// 3. PRODUCT FORM (2 Pruebas)
// ------------------------------------------------------------------
describe('Pruebas del Formulario de Administración (Jasmine)', () => {
  let mockSaveSpy;

  beforeEach(() => {
    mockSaveSpy = jasmine.createSpy('onSave');
  });

  it('7. Debe actualizar el valor del input al escribir en Nombre', () => {
    const { getByLabelText } = render(<ProductForm onSave={mockSaveSpy} />);
    const input = getByLabelText(/nombre del producto/i);
    fireEvent.change(input, { target: { value: 'Espinaca Fresca' } });
    expect(input.value).toBe('Espinaca Fresca');
  });

  it('8. Debe enviar los datos del formulario al hacer clic en Guardar', () => {
    const { getByRole, getByLabelText } = render(<ProductForm onSave={mockSaveSpy} />);
    fireEvent.change(getByLabelText(/nombre del producto/i), { target: { value: 'Lechuga' } });
    fireEvent.change(getByLabelText(/precio/i), { target: { value: '900' } });
    fireEvent.click(getByRole('button', { name: /guardar/i }));
    expect(mockSaveSpy).toHaveBeenCalledWith({ nombre: 'Lechuga', precio: 900 });
  });
});

// ------------------------------------------------------------------
// 4. PRODUCT DETAIL (2 Pruebas)
// ------------------------------------------------------------------
describe('Pruebas de Detalle de Producto (Jasmine)', () => {
  it('9. Debe deshabilitar el botón de compra si el stock es 0', () => {
    const sinStock = { id: 1, nombre: 'Tomate', precio: 500, stock: 0 };
    const { getByRole } = render(<ProductDetail product={sinStock} />);
    const btn = getByRole('button', { name: /sin stock/i });
    expect(btn.disabled).toBe(true);
  });

  it('10. Debe renderizar la descripción del producto en la pantalla', () => {
    const prod = { id: 2, nombre: 'Uva', descripcion: 'Fruta fresca de estación', precio: 1500, stock: 10 };
    const { getByText } = render(<ProductDetail product={prod} />);
    expect(getByText('Fruta fresca de estación')).toBeTruthy();
  });
});