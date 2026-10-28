
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main>
      <section className="home-hero py-5">
        <div className="container text-center py-4 py-lg-5">
          <div className="hero-content">

            <span className="hero-eyebrow">
              🌿 FRESCO, LOCAL Y NATURAL
            </span>

            <h1 className="fw-bold">
              Productos Orgánicos Directo a tu Mesa 🌱
            </h1>

            <p className="lead mt-3">
              Cosecha fresca del día, cultivada con procesos
              sustentables y libres de químicos.
            </p>

            <Link
              to="/productos"
              className="btn btn-light text-success fw-bold rounded-pill px-4 py-2 mt-4 hero-cta"
            >
              Ver productos <span aria-hidden="true">→</span>
            </Link>

            <div className="hero-features">
              <span className="hero-feature">
                🍎 Productos frescos
              </span>

              <span className="hero-feature">
                🌱 Selección natural
              </span>

              <span className="hero-feature">
                ♻️ Consumo responsable
              </span>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
