import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { regiones } from '../data/regiones';

// Cambia a 0 para mostrar siempre el pago rechazado (útil en la presentación)
// o a 1 para mostrar siempre el pago aprobado.
const PROBABILIDAD_EXITO = 0.8;

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Campo({ label, name, value, onChange, error, placeholder, type = 'text', requerido = true }) {
  return (
    <div className="mb-3">
      <label className="form-label fw-semibold">
        {label}
        {requerido && <span className="text-danger">*</span>}
      </label>
      <input
        type={type}
        name={name}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default function Checkout({
  carrito,
  onClearCart,
  usuarioActual,
  onCompraExitosa
}) {
  const navigate = useNavigate();

  // Si el usuario inició sesión, se autocompletan sus datos
  const regionInicial =
    regiones.find((r) => r.comunas.includes(usuarioActual?.comuna))?.nombre || '';

  const [datos, setDatos] = useState({
    nombre: usuarioActual?.nombre || '',
    apellidos: '',
    correo: usuarioActual?.email || '',
    calle: usuarioActual?.direccion || '',
    departamento: '',
    region: regionInicial,
    comuna: regionInicial ? usuarioActual.comuna : '',
    indicaciones: '',
    tipoEntrega: 'Despacho estándar (3 a 5 días)'
  });

  const [errores, setErrores] = useState({});

  const comunasDisponibles =
    regiones.find((r) => r.nombre === datos.region)?.comunas || [];

  const total = carrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDatos((prev) =>
      name === 'region'
        ? { ...prev, region: value, comuna: '' }
        : { ...prev, [name]: value }
    );
  };

  const validar = () => {
    const nuevos = {};

    if (!datos.nombre.trim()) nuevos.nombre = 'El nombre es obligatorio';
    if (!datos.apellidos.trim()) nuevos.apellidos = 'Los apellidos son obligatorios';

    if (!datos.correo.trim()) {
      nuevos.correo = 'El correo es obligatorio';
    } else if (!regexEmail.test(datos.correo)) {
      nuevos.correo = 'El formato del correo no es válido';
    }

    if (!datos.calle.trim()) nuevos.calle = 'La calle es obligatoria';
    if (!datos.region) nuevos.region = 'Selecciona una región';
    if (!datos.comuna) nuevos.comuna = 'Selecciona una comuna';

    setErrores(nuevos);
    return Object.keys(nuevos).length === 0;
  };

  const confirmarCompra = () => {
    if (!validar()) return;

    const orden = {
      numero: 'ORD-' + Date.now(),
      fecha: new Date().toLocaleString('es-CL'),
      nombre: `${datos.nombre} ${datos.apellidos}`.trim(),
      correo: datos.correo,
      direccion:
        datos.calle +
        (datos.departamento ? `, Depto ${datos.departamento}` : ''),
      region: datos.region,
      comuna: datos.comuna,
      indicaciones: datos.indicaciones,
      tipoEntrega: datos.tipoEntrega,
      productos: carrito,
      total
    };

    // Simulación del pago
    const pagoAprobado = Math.random() < PROBABILIDAD_EXITO;

    if (!pagoAprobado) {
      localStorage.setItem('ordenFallida', JSON.stringify(orden));
      navigate('/compra-fallida');
      return;
    }

    localStorage.setItem('ultimaOrden', JSON.stringify(orden));

    if (usuarioActual) {
      onCompraExitosa(orden);
    }

    onClearCart();
    navigate('/compra-exitosa');
  };

  if (carrito.length === 0) {
    return (
      <div className="container py-5">
        <div className="alert alert-info">
          Tu carrito está vacío.{' '}
          <Link to="/productos">Ver productos</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">

              <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
                <div>
                  <h1 className="fw-bold text-success h3 mb-1">Carrito de compra</h1>
                  <p className="text-muted mb-0">Completa la siguiente información</p>
                </div>
                <span className="badge bg-primary fs-6">
                  Total a pagar: ${total}
                </span>
              </div>

              {/* RESUMEN */}
              <div className="table-responsive mb-4">
                <table className="table table-sm align-middle">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.map((p) => (
                      <tr key={p.id}>
                        <td>{p.nombre}</td>
                        <td>${p.precio}</td>
                        <td>{p.cantidad}</td>
                        <td>${p.precio * p.cantidad}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {usuarioActual && (
                <div className="alert alert-success">
                  👤 Datos cargados automáticamente para{' '}
                  <strong>{usuarioActual.nombre}</strong>
                </div>
              )}

              {/* INFORMACIÓN DEL CLIENTE */}
              <h5 className="fw-bold">Información del cliente</h5>

              <div className="row">
                <div className="col-md-6">
                  <Campo label="Nombre" name="nombre" value={datos.nombre}
                    onChange={handleChange} error={errores.nombre} />
                </div>
                <div className="col-md-6">
                  <Campo label="Apellidos" name="apellidos" value={datos.apellidos}
                    onChange={handleChange} error={errores.apellidos} />
                </div>
              </div>

              <Campo label="Correo" name="correo" type="email" value={datos.correo}
                onChange={handleChange} error={errores.correo} />

              {/* DIRECCIÓN */}
              <h5 className="fw-bold mt-2">Dirección de entrega de los productos</h5>

              <div className="row">
                <div className="col-md-8">
                  <Campo label="Calle" name="calle" value={datos.calle}
                    onChange={handleChange} error={errores.calle} />
                </div>
                <div className="col-md-4">
                  <Campo label="Departamento (opcional)" name="departamento"
                    value={datos.departamento} onChange={handleChange}
                    placeholder="Ej: 603" requerido={false} />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    Región<span className="text-danger">*</span>
                  </label>
                  <select
                    name="region"
                    className={`form-select ${errores.region ? 'is-invalid' : ''}`}
                    value={datos.region}
                    onChange={handleChange}
                  >
                    <option value="">Selecciona una región</option>
                    {regiones.map((r) => (
                      <option key={r.nombre} value={r.nombre}>{r.nombre}</option>
                    ))}
                  </select>
                  {errores.region && (
                    <div className="invalid-feedback">{errores.region}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    Comuna<span className="text-danger">*</span>
                  </label>
                  <select
                    name="comuna"
                    className={`form-select ${errores.comuna ? 'is-invalid' : ''}`}
                    value={datos.comuna}
                    onChange={handleChange}
                    disabled={!datos.region}
                  >
                    <option value="">Selecciona una comuna</option>
                    {comunasDisponibles.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errores.comuna && (
                    <div className="invalid-feedback">{errores.comuna}</div>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Indicaciones para la entrega (opcional)
                </label>
                <textarea
                  name="indicaciones"
                  className="form-control"
                  rows="2"
                  placeholder="Ej: Entre calles, color del edificio, no tiene timbre."
                  value={datos.indicaciones}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Opción de entrega</label>
                <select
                  name="tipoEntrega"
                  className="form-select"
                  value={datos.tipoEntrega}
                  onChange={handleChange}
                >
                  <option>Despacho estándar (3 a 5 días)</option>
                  <option>Despacho express (24 horas)</option>
                </select>
              </div>

              <div className="text-end">
                <button
                  className="btn btn-success rounded-pill px-4"
                  onClick={confirmarCompra}
                >
                  Pagar ahora ${total}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}