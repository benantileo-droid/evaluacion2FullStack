import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <section
        className="bg-success text-white py-5 shadow-sm"
        style={{
          background: 'linear-gradient(135deg, #198754 0%, #146c43 100%)'
        }}
      >
        <div className="container text-center py-5">
          <h1 className="display-4 fw-bold">
            Productos Orgánicos Directo a tu Mesa 🌱
          </h1>

          <p className="lead mt-3">
            Cosecha fresca del día, cultivada con procesos sustentables
            y libres de químicos.
          </p>

          <Link
            to="/productos"
            className="btn btn-light text-success fw-bold rounded-pill px-4 py-2 mt-3"
          >
            Ver productos
          </Link>
        </div>
      </section>
    </div>
  );
}