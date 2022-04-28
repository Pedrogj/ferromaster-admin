import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../../firebase/firebaseConfig";
import { Link } from "react-router-dom";

export const ListProduct = () => {
  // Hooks
  const [products, setProducts] = useState([]);

  // Referencia a la db firestore
  const productsCollection = collection(db, "products");

  // Funcion para mostrar todos los docs
  const getProducts = async () => {
    const data = await getDocs(query(productsCollection));
    const dataDocs = [];

    data.forEach((item) => {
      dataDocs.push({
        id: item.id,
        ...item.data(),
      });
    });

    setProducts(dataDocs);
  };

  // Funcion para eliminar un doc
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    getProducts();
  };

  // Funcion de confirmacio de eliminar
  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // llamamos la funcion para eliminar
        deleteProduct(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  // useEffect
  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <div className="d-grid gap-2">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>
                      <Link
                        to={`/edit-product/${item.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => {
                          confirmDelete(item.id);
                        }}
                        className="btn btn-danger btn-sm"
                      >
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
