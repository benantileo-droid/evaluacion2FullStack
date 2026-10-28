import React from 'react';
import {
  render,
  fireEvent,
  cleanup
} from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import ProductForm from '../pages/admin/ProductForm.jsx';
import ProductCard from '../components/ProductCard.jsx';
import Carrito from '../pages/Carrito.jsx';


// ======================================================
// 1. PRODUCT FORM
// ======================================================

describe('Pruebas de ProductForm', () => {

  afterEach(() => {
    cleanup();
  });


  it('1. Debe mostrar el formulario de nuevo producto', () => {

    const onSave = jasmine.createSpy('onSave');

    const { getByText } = render(
      <ProductForm
        onSave={onSave}
        productoEditando={null}
      />
    );

    expect(
      getByText(/Nuevo Producto/i)
    ).toBeTruthy();

  });


  it('2. Debe permitir escribir el nombre del producto', () => {

    const onSave = jasmine.createSpy('onSave');

    const { getByLabelText } = render(
      <ProductForm
        onSave={onSave}
        productoEditando={null}
      />
    );

    const inputNombre =
      getByLabelText(/Nombre del producto/i);

    fireEvent.change(inputNombre, {
      target: {
        value: 'Tomate Orgánico'
      }
    });

    expect(
      inputNombre.value
    ).toBe('Tomate Orgánico');

  });


  it('3. Debe cargar los datos cuando se edita un producto', () => {

    const onSave = jasmine.createSpy('onSave');

    const producto = {
      id: 1,
      nombre: 'Manzana Orgánica',
      precio: 1200,
      categoria: 'Frutas',
      descripcion: 'Manzana fresca',
      imagen: 'https://via.placeholder.com/300'
    };

    const { getByLabelText } = render(
      <ProductForm
        onSave={onSave}
        productoEditando={producto}
      />
    );

    expect(
      getByLabelText(/Nombre del producto/i).value
    ).toBe('Manzana Orgánica');

    expect(
      getByLabelText(/Precio/i).value
    ).toBe('1200');

  });

});


// ======================================================
// 2. PRODUCT CARD
// ======================================================

describe('Pruebas de ProductCard', () => {

  afterEach(() => {
    cleanup();
  });


  const producto = {
    id: 1,
    nombre: 'Manzana Orgánica',
    precio: 1200,
    categoria: 'Frutas',
    descripcion: 'Manzana fresca',
    imagen: 'https://via.placeholder.com/300'
  };


  it('4. Debe mostrar el nombre y precio del producto', () => {

    const onAddToCart =
      jasmine.createSpy('onAddToCart');

    const { getByText } = render(
      <MemoryRouter>

        <ProductCard
          product={producto}
          onAddToCart={onAddToCart}
          modoAdmin={false}
        />

      </MemoryRouter>
    );

    expect(
      getByText('Manzana Orgánica')
    ).toBeTruthy();

    expect(
      getByText('$1200')
    ).toBeTruthy();

  });


  it('5. Debe agregar el producto al carrito al hacer clic', () => {

    const onAddToCart =
      jasmine.createSpy('onAddToCart');

    const { getByRole } = render(
      <MemoryRouter>

        <ProductCard
          product={producto}
          onAddToCart={onAddToCart}
          modoAdmin={false}
        />

      </MemoryRouter>
    );

    const botonAgregar = getByRole(
      'button',
      {
        name: /Agregar/i
      }
    );

    fireEvent.click(botonAgregar);

    expect(
      onAddToCart
    ).toHaveBeenCalledWith(producto);

  });


  it('6. Debe mostrar Editar y Eliminar cuando está en modo Admin', () => {

    const onEdit =
      jasmine.createSpy('onEdit');

    const onDelete =
      jasmine.createSpy('onDelete');

    const { getByRole } = render(
      <MemoryRouter>

        <ProductCard
          product={producto}
          onEdit={onEdit}
          onDelete={onDelete}
          modoAdmin={true}
        />

      </MemoryRouter>
    );

    expect(
      getByRole(
        'button',
        {
          name: /Editar/i
        }
      )
    ).toBeTruthy();

    expect(
      getByRole(
        'button',
        {
          name: /Eliminar/i
        }
      )
    ).toBeTruthy();

  });

});


// ======================================================
// 3. CARRITO
// ======================================================

describe('Pruebas de Carrito', () => {

  afterEach(() => {
    cleanup();
  });


  it('7. Debe mostrar mensaje cuando el carrito está vacío', () => {

    const { getByText } = render(
      <MemoryRouter>

        <Carrito
          carrito={[]}
          onRemove={() => {}}
          onIncrease={() => {}}
          onDecrease={() => {}}
        />

      </MemoryRouter>
    );

    expect(
      getByText(/Tu carrito está vacío/i)
    ).toBeTruthy();

  });


  it('8. Debe calcular correctamente el total del carrito', () => {

    const carrito = [
      {
        id: 1,
        nombre: 'Manzana',
        precio: 1000,
        cantidad: 2
      },
      {
        id: 2,
        nombre: 'Naranja',
        precio: 1500,
        cantidad: 1
      }
    ];

    const { getByText } = render(
      <MemoryRouter>

        <Carrito
          carrito={carrito}
          onRemove={() => {}}
          onIncrease={() => {}}
          onDecrease={() => {}}
        />

      </MemoryRouter>
    );

    expect(
      getByText('Total: $3500')
    ).toBeTruthy();

  });


  it('9. Debe llamar a aumentar cantidad al presionar +', () => {

    const onIncrease =
      jasmine.createSpy('onIncrease');

    const carrito = [
      {
        id: 1,
        nombre: 'Manzana',
        precio: 1000,
        cantidad: 1
      }
    ];

    const { getByRole } = render(
      <MemoryRouter>

        <Carrito
          carrito={carrito}
          onRemove={() => {}}
          onIncrease={onIncrease}
          onDecrease={() => {}}
        />

      </MemoryRouter>
    );

    const botonAumentar = getByRole(
      'button',
      {
        name: '+'
      }
    );

    fireEvent.click(botonAumentar);

    expect(
      onIncrease
    ).toHaveBeenCalledWith(1);

  });


  it('10. Debe llamar a eliminar con el id del producto', () => {

    const onRemove =
      jasmine.createSpy('onRemove');

    const carrito = [
      {
        id: 1,
        nombre: 'Manzana',
        precio: 1000,
        cantidad: 1
      }
    ];

    const { getByRole } = render(
      <MemoryRouter>

        <Carrito
          carrito={carrito}
          onRemove={onRemove}
          onIncrease={() => {}}
          onDecrease={() => {}}
        />

      </MemoryRouter>
    );

    const botonEliminar = getByRole(
      'button',
      {
        name: /Eliminar/i
      }
    );

    fireEvent.click(botonEliminar);

    expect(
      onRemove
    ).toHaveBeenCalledWith(1);

  });

});