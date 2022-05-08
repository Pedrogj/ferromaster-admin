import React, { useState } from "react";
import Swal from "sweetalert2";
import { saveImageProduct, sendFile } from "../../services/products";

export const NewProduct = () => {
  const [imgURL, setImgURL] = useState("");

  // funcion para guardar imagen
  const handleFile = async (e) => {
    e.preventDefault();
    // obteniendo url de la imagen
    const imageUrl = await saveImageProduct(e);
    setImgURL(imageUrl);
  };

  // submited
  const handleSubmit = (e) => {
    e.preventDefault();
    const nameFile = e.target.name.value;
    const description = e.target.description.value;
    const category = e.target.category.value;

    sendFile(nameFile, imgURL, description, category);

    // Reset form
    e.target.reset();

    Swal.fire({
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h3 className="mt-3">Nuevo Producto</h3>
            <div className="shadow-lg p-3 mb-5 mt-4 bg-body rounded">
              <form className="row g-2" onSubmit={handleSubmit}>
                <div className="input-group mb-2">
                  <input
                    className="form-control"
                    type="file"
                    onChange={handleFile}
                    required
                  />
                </div>
                <div className="mb-2">
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Nombre del Producto"
                    required
                  />
                </div>
                <div className="mb-2">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="category"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Seleccione Categoria
                    </option>
                    <option value="tools">herramientas</option>
                    <option value="furniture">muebleria</option>
                    <option value="pipelines">tuberias</option>
                    <option value="cleaning">aseo</option>
                    <option value="pool">piscina</option>
                    <option value="pets">mascotas</option>
                  </select>
                </div>
                <div className="mb-2">
                  <textarea
                    className="form-control"
                    name="description"
                    placeholder="Descripcion de Producto"
                    cols="30"
                    rows="5"
                    required
                  ></textarea>
                </div>

                <div className="col-12">
                  <button className="btn btn-primary">Agregar Producto</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
