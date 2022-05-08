import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import {
  deleteProductById,
  getAllProducts,
  deleteImageStorage,
} from "../../services/products";

export const ListProduct = () => {
  // Hooks
  const [allProducts, setAllProducts] = useState([]);

  // all products
  const getData = async () => {
    const products = await getAllProducts();
    setAllProducts(products);
  };

  // Delete Function
  const deleteProductId = (id) => {
    deleteProductById(id);
    getData();
  };

  // Funcion de confirmacio de eliminar sweetalert
  const confirmDelete = (id, img) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Get delete Function
        deleteProductId(id);
        deleteImageStorage(img);
        Swal.fire("Eliminado!", "Su archivo ha sido eliminado.", "éxito");
      }
    });
  };

  // useEffect
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const requireProducts = allProducts.map((item) => (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>
        <Link
          to={`/edit-product/${item.id}`}
          className="btn btn-primary btn-sm"
        >
          Editar
        </Link>
        <button
          onClick={() => {
            confirmDelete(item.id, item.img);
          }}
          className="btn btn-danger btn-sm"
        >
          Borrar
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <div className="d-grid gap-2">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Editar/Eliminar</th>
                </tr>
              </thead>
              <tbody>{requireProducts}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
