import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogs } from '../data/blogs';

export default function BlogDetail() {
  const { id } = useParams();

  const blog = blogs.find(
    (publicacion) => publicacion.id === Number(id)
  );

  if (!blog) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          Publicación no encontrada.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-5">
              <h1 className="fw-bold text-success mb-4">
                {blog.titulo}
              </h1>

              <p className="lead">
                {blog.contenido}
              </p>

              <Link
                to="/blog"
                className="btn btn-outline-success rounded-pill mt-3"
              >
                Volver al Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}