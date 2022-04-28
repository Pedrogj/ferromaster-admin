import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../firebase/firebaseConfig";
import Swal from "sweetalert2";

export const NewProduct = () => {
  const [imgURL, setImgURL] = useState("");

  // funcion para guardar imagen
  const handleFile = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, file.name);

    // subiendo archivo
    await uploadBytes(storageRef, file);

    // obteniendo url de la imagen
    const imageUrl = await getDownloadURL(ref(storage, file.name));
    setImgURL(imageUrl);
  };

  // submited
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameFile = e.target.name.value;
    const nota = e.target.description.value;
    const category = e.target.category.value;

    await addDoc(collection(db, "products"), {
      name: nameFile,
      img: imgURL,
      description: nota,
      category: category,
    });

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
                    <option value="herramientas">herramientas</option>
                    <option value="muebleria">muebleria</option>
                    <option value="tuberias">tuberias</option>
                    <option value="aseo">aseo</option>
                    <option value="piscina">piscina</option>
                    <option value="mascotas">mascotas</option>
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
