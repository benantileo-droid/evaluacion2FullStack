import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout({ carrito, onClearCart }) {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [comuna, setComuna] = useState('');
  const [tipoEntrega, setTipoEntrega] = useState('Domicilio');
  const navigate = useNavigate();
  const [estadoPago, setEstadoPago] = useState('aprobado');
  const total = carrito.reduce(
  (acumulador, producto) =>
    acumulador + producto.precio * producto.cantidad,
  0
);

const confirmarCompra = () => {
  if (nombre === '' || direccion === '' || comuna === '') {
    alert('Por favor completa todos los datos.');
    return;
  }

  if (estadoPago === 'rechazado') {
    navigate('/compra-fallida');
    return;
  }

  onClearCart();
  navigate('/compra-exitosa');
};

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h1 className="fw-bold text-success mb-4">
                Finalizar Compra
              </h1>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ingresa tu nombre"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Dirección
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Ingresa tu dirección"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Comuna
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={comuna}
                  onChange={(e) => setComuna(e.target.value)}
                  placeholder="Ingresa tu comuna"
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Tipo de entrega
                </label>

                <select
                  className="form-select"
                  value={tipoEntrega}
                  onChange={(e) => setTipoEntrega(e.target.value)}
                >
                  <option value="Domicilio">
                    Despacho a domicilio
                  </option>
                  <option value="Retiro">
                    Retiro en tienda
                  </option>
                </select>
              </div>
          <div className="mb-4">
  <label className="form-label fw-semibold">
    Resultado de pago
  </label>

  <select
    className="form-select"
    value={estadoPago}
    onChange={(e) => setEstadoPago(e.target.value)}
  >
    <option value="aprobado">
      Pago aprobado
    </option>

    <option value="rechazado">
      Pago rechazado
    </option>
  </select>
</div>    
<div className="border-top pt-4 mb-4">
  <h4 className="fw-bold mb-3">Resumen de compra</h4>

  {carrito.map((producto) => (
    <div
      key={producto.id}
      className="d-flex justify-content-between mb-2"
    >
      <span>
        {producto.nombre} x{producto.cantidad}
      </span>

      <span>
        ${producto.precio * producto.cantidad}
      </span>
    </div>
  ))}

  <div className="d-flex justify-content-between border-top pt-3 mt-3">
    <strong>Total:</strong>
    <strong className="text-success">
      ${total}
    </strong>
  </div>
</div>
              <button
  className="btn btn-success w-100 rounded-pill"
  onClick={confirmarCompra}
>
  Confirmar compra
</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}