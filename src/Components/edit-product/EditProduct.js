import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct, getProduct } from "../../services/products";

export const EditProduct = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  // update product
  const update = (e) => {
    e.preventDefault();
    updateProduct(productName, description, id);
    navigate("/");
  };

  // get product by id
  const getProductById = async (id) => {
    const productById = await getProduct(id);
    setProductName(productById.data().name);
    setDescription(productById.data().description);
  };

  useEffect(() => {
    getProductById(id);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h3 className="mt-3">Editar Producto</h3>
            <div className="shadow-lg p-3 mb-5 mt-4 bg-body rounded">
              <form className="row g-2" onSubmit={update}>
                <div className="mb-2">
                  <input
                    className="form-control"
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Nombre del Producto"
                    required
                  />
                </div>
                <div className="mb-2">
                  <textarea
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descripcion de Producto"
                    cols="30"
                    rows="5"
                    required
                  ></textarea>
                </div>

                <div className="col-12">
                  <button className="btn btn-primary">
                    Actualizar Producto
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
