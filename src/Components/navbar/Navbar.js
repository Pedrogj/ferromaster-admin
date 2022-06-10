import React from "react";
import { Link } from "react-router-dom";
import { route } from "../../routers/Routes";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <h1 className="navbar-brand">FerroMaster - Admin</h1>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to={route.root} className="nav-link">
                Lista de Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={route.newProduct} className="nav-link">
                Crear Producto
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
