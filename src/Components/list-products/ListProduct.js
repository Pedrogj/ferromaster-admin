import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import {
  deleteProductById,
  getAllProducts,
  deleteImageStorage,
} from "../../services/products";
import { InputSearch } from "../input-search/InputSearch";
import { cleanSearchText } from "../../helpers/helpers";

export const ListProduct = () => {
  // Hooks
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // all products
  const getData = async () => {
    const products = await getAllProducts();
    setAllProducts(products);
  };

  // Product search function
  const search = (elements) => {
    const text = cleanSearchText(searchTerm);

    return elements.filter((element) =>
      cleanSearchText(element.name).includes(text)
    );
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

  const requireProducts = search(allProducts).map((item, index) => (
    <tr key={item.id}>
      <td>{index + 1}</td>
      <td>{item.name}</td>
      <td>${item.price}</td>
      <td>
        <div style={{ display: "flex" }}>
          <Link
            to={`/edit-product/${item.id}`}
            className="btn btn-primary btn-sm"
          >
            Editar
          </Link>

          <button
            style={{ marginLeft: "5px" }}
            onClick={() => {
              confirmDelete(item.id, item.img);
            }}
            className="btn btn-danger btn-sm"
          >
            Borrar
          </button>
        </div>
      </td>
    </tr>
  ));

  return (
    <div className="container mt-5">
      <InputSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="row d-flex justify-content-center">
        <div className="col">
          <div className="d-grid gap-2">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Precio</th>
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
