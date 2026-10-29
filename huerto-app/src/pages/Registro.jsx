import { useState } from 'react';

const Registro = ({ onRegister, usuarios }) => {
  const [formData, setFormData] = useState({
  nombre: '',
  email: '',
  password: '',
  confirmarPassword: '',
  direccion: '',
  comuna: ''
});

  const [errores, setErrores] = useState({});

  const validar = () => {
    let nuevosErrores = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio';
    if (!formData.email) {
      nuevosErrores.email = 'El correo es obligatorio';
    } else if (!regexEmail.test(formData.email)) {
      nuevosErrores.email = 'El formato del correo no es válido';
    }
    if (!formData.password) {
      nuevosErrores.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    if (formData.password !== formData.confirmarPassword) {
      nuevosErrores.confirmarPassword = 'Las contraseñas no coinciden';
    }
    if (!formData.direccion.trim()) {
  nuevosErrores.direccion = 'La dirección es obligatoria';
}

if (!formData.comuna.trim()) {
  nuevosErrores.comuna = 'La comuna es obligatoria';
}

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (validar()) {
    onRegister({
      nombre: formData.nombre,
      email: formData.email,
      password: formData.password,
      direccion: formData.direccion,
      comuna: formData.comuna
    });

    alert('Registro exitoso');
  }
};

  return (
    <div className="container mt-5">
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} />
          {errores.nombre && <small className="text-danger">{errores.nombre}</small>}
        </div>
        
        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
          {errores.email && <small className="text-danger">{errores.email}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} />
          {errores.password && <small className="text-danger">{errores.password}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">Confirmar Contraseña</label>
          <input type="password" name="confirmarPassword" className="form-control" value={formData.confirmarPassword} onChange={handleChange} />
          {errores.confirmarPassword && <small className="text-danger">{errores.confirmarPassword}</small>}
        </div>
        <div className="mb-3">
  <label htmlFor="direccion" className="form-label">
    Dirección
  </label>

  <input
    type="text"
    className={`form-control ${errores.direccion ? 'is-invalid' : ''}`}
    id="direccion"
    name="direccion"
    value={formData.direccion}
    onChange={handleChange}
    placeholder="Ej: Los Carrera 123"
  />

  {errores.direccion && (
    <div className="invalid-feedback">
      {errores.direccion}
    </div>
  )}
</div>

<div className="mb-3">
  <label htmlFor="comuna" className="form-label">
    Comuna
  </label>

  <input
    type="text"
    className={`form-control ${errores.comuna ? 'is-invalid' : ''}`}
    id="comuna"
    name="comuna"
    value={formData.comuna}
    onChange={handleChange}
    placeholder="Ej: Melipilla"
  />

  {errores.comuna && (
    <div className="invalid-feedback">
      {errores.comuna}
    </div>
  )}
</div>

        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;