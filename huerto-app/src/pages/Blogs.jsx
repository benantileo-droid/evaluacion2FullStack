import React from 'react';
import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';

export default function Blog() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-success">
          Blog Huerto Hogar 🌱
        </h1>

        <p className="text-muted">
          Consejos e información para una vida más saludable.
        </p>
      </div>

      <div className="row g-4">
        {blogs.map((blog) => (
          <div className="col-md-4" key={blog.id}>
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body p-4">
                <h4 className="fw-bold text-success">
                  {blog.titulo}
                </h4>

                <p className="text-muted mt-3">
                  {blog.resumen}
                </p>

                <Link
                  to={`/blog/${blog.id}`}
                  className="btn btn-outline-success rounded-pill"
                >
                  Leer más
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}