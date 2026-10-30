import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const vacio = {
  nombre: "",
  email: "",
  password: "",
  direccion: "",
  comuna: "",
  rol: "cliente"
};

export default function AdminUsuarioForm({ usuarios = [], onCreate, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const usuarioEditando = id
    ? usuarios.find((u) => u.id === Number(id))
    : null;

  const [datos, setDatos] = useState(
    usuarioEditando ? { ...vacio, ...usuarioEditando, password: "" } : vacio
  );
  const [errores, setErrores] = useState({});

  if (id && !usuarioEditando) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">El usuario no existe.</div>
        <Link to="/admin/usuarios" className="btn btn-outline-secondary btn-sm">
          ← Volver a usuarios
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const validar = () => {
    const nuevos = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!datos.nombre.trim()) nuevos.nombre = "El nombre es obligatorio";

    if (!datos.email.trim()) {
      nuevos.email = "El correo es obligatorio";
    } else if (!regexEmail.test(datos.email)) {
      nuevos.email = "El formato del correo no es válido";
    } else if (
      usuarios.some(
        (u) =>
          u.email.toLowerCase() === datos.email.toLowerCase() &&
          u.id !== usuarioEditando?.id
      )
    ) {
      nuevos.email = "Ya existe un usuario con ese correo";
    }

    if (!usuarioEditando && !datos.password) {
      nuevos.password = "La contraseña es obligatoria";
    } else if (datos.password && datos.password.length < 6) {
      nuevos.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!datos.direccion.trim()) nuevos.direccion = "La dirección es obligatoria";
    if (!datos.comuna.trim()) nuevos.comuna = "La comuna es obligatoria";

    setErrores(nuevos);
    return Object.keys(nuevos).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;

    const cambios = {
      nombre: datos.nombre.trim(),
      email: datos.email.trim(),
      direccion: datos.direccion.trim(),
      comuna: datos.comuna.trim(),
      rol: datos.rol
    };
    if (datos.password) cambios.password = datos.password;

    if (usuarioEditando) {
      onUpdate(usuarioEditando.id, cambios);
    } else {
      onCreate(cambios);
    }
    navigate("/admin/usuarios");
  };

  const campo = (name, label, type) => (
    <div className="mb-3">
      <label className="form-label" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type || "text"}
        className={"form-control " + (errores[name] ? "is-invalid" : "")}
        value={datos[name]}
        onChange={handleChange}
      />
      {errores[name] && <div className="invalid-feedback">{errores[name]}</div>}
    </div>
  );

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <h1 className="fw-bold text-success mb-4">
            {usuarioEditando ? "Editar usuario" : "Nuevo usuario"}
          </h1>

          <form className="card border-0 shadow-sm p-4" onSubmit={handleSubmit}>
            {campo("nombre", "Nombre")}
            {campo("email", "Correo", "email")}
            {campo(
              "password",
              usuarioEditando
                ? "Nueva contraseña (déjala vacía para no cambiarla)"
                : "Contraseña",
              "password"
            )}
            {campo("direccion", "Dirección")}
            {campo("comuna", "Comuna")}

            <div className="mb-4">
              <label className="form-label" htmlFor="rol">Rol</label>
              <select
                id="rol"
                name="rol"
                className="form-select"
                value={datos.rol}
                onChange={handleChange}
              >
                <option value="cliente">Cliente</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-success">
                Guardar
              </button>
              <Link to="/admin/usuarios" className="btn btn-outline-secondary">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}