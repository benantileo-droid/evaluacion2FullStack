import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ usuarios, onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validar()) {
      return;
    }

    const usuarioEncontrado = usuarios.find(
      (usuario) =>
        usuario.email === formData.email &&
        usuario.password === formData.password
    );

    if (!usuarioEncontrado) {
      setErrores({
        general: 'Correo o contraseña incorrectos'
      });
      return;
    }

    onLogin(usuarioEncontrado);

    alert(`Bienvenido ${usuarioEncontrado.nombre}`);

    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>

      <form onSubmit={handleSubmit}>

        {errores.general && (
          <div className="alert alert-danger">
            {errores.general}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">
            Correo Electrónico
          </label>

          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />

          {errores.email && (
            <small className="text-danger">
              {errores.email}
            </small>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">
            Contraseña
          </label>

          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
          />

          {errores.password && (
            <small className="text-danger">
              {errores.password}
            </small>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Ingresar
        </button>

      </form>
    </div>
  );
};

export default Login;