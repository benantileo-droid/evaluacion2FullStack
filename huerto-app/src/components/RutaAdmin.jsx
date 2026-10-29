import { Navigate } from 'react-router-dom';

export default function RutaAdmin({ usuarioActual, children }) {
  return usuarioActual?.rol === 'admin'
    ? children
    : <Navigate to="/login" replace />;
}