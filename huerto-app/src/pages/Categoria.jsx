import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Categoria({ setCategoriaSeleccionada }) {
  const navigate = useNavigate();

  const verCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
    navigate('/productos');
  };

  return (
    <div className="container py-5">
      <h1 className="fw-bold text-success text-center mb-5">
        Categorías
      </h1>

      <div className="row justify-content-center g-4">
        <div className="col-md-5">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center p-5">
              <div className="display-3 mb-3">🍎</div>
              <h2 className="fw-bold">Frutas</h2>

              <button
                className="btn btn-success rounded-pill px-4 mt-3"
                onClick={() => verCategoria('Frutas')}
              >
                Ver productos
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-5">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center p-5">
              <div className="display-3 mb-3">🥬</div>
              <h2 className="fw-bold">Verduras</h2>

              <button
                className="btn btn-success rounded-pill px-4 mt-3"
                onClick={() => verCategoria('Verduras')}
              >
                Ver productos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}