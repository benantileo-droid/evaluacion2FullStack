import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import ProductForm from '../pages/admin/ProductForm.jsx';

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

    expect(inputNombre.value)
      .toBe('Tomate Orgánico');

  });


  it('3. Debe cargar los datos cuando se edita un producto', () => {

    const onSave = jasmine.createSpy('onSave');

    const producto = {
      id: 1,
      nombre: 'Manzana Orgánica',
      precio: 1200,
      categoria: 'Frutas',
      descripcion: 'Manzana fresca',
      imagen: 'manzana.jpg'
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