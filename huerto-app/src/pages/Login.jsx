import { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errores, setErrores] = useState({});

  const validar = () => {
    let nuevosErrores = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      nuevosErrores.email = 'El correo es obligatorio';
    } else if (!regexEmail.test(formData.email)) {
      nuevosErrores.email = 'El formato del correo no es válido';
    }
    
    if (!formData.password) {
      nuevosErrores.password = 'La contraseña es obligatoria';
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
      console.log('Formulario de login válido:', formData);
      alert('Inicio de sesión exitoso');
      // Aquí puedes agregar la lógica para autenticar en tu backend
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="btn btn-primary">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;