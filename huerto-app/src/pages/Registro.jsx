import { useState } from 'react';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: ''
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

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validar()) {
      console.log('Formulario de registro válido:', formData);
      alert('Registro exitoso');
      // Aquí puedes agregar la lógica para enviar los datos a tu backend
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

        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;