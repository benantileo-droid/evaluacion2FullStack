import React from 'react';

export default function Nosotros() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-5">
            <h1 className="fw-bold text-success">
              Sobre Huerto Hogar 🌱
            </h1>

            <p className="lead text-muted mt-3">
              Productos frescos y orgánicos directo a tu hogar.
            </p>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body p-5">
              <h3 className="fw-bold text-success">
                ¿Quiénes somos?
              </h3>

              <p>
                Huerto Hogar es una tienda dedicada a ofrecer frutas
                y verduras frescas, promoviendo una alimentación
                saludable y el consumo de productos naturales.
              </p>

              <h3 className="fw-bold text-success mt-4">
                Nuestra misión
              </h3>

              <p>
                Acercar productos frescos y de calidad a nuestros
                clientes de una manera simple, rápida y accesible.
              </p>

              <h3 className="fw-bold text-success mt-4">
                Nuestro compromiso
              </h3>

              <p className="mb-0">
                Trabajamos para entregar una buena experiencia de
                compra y fomentar el consumo responsable y sustentable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}