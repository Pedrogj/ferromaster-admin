import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db } from "../firebase/firebaseConfig";

// Reference db firestore
const productsCollection = collection(db, "products");
// Storage
const storage = getStorage();

// Get Products all Function
export const getAllProducts = async () => {
  try {
    const data = await getDocs(query(productsCollection));
    const dataDocs = [];

    data.forEach((item) => {
      dataDocs.push({
        id: item.id,
        ...item.data(),
      });
    });

    return dataDocs;
  } catch (error) {
    // console.log(error)
  }
};

// Delete Function
export const deleteProductById = async (id) => {
  try {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
  } catch (error) {
    // console.log(error)
  }
};

// Save image product Function
export const saveImageProduct = async (e) => {
  try {
    const file = e.target.files[0];

    // Reference Storage
    const storageRef = ref(storage, file.name);

    // subiendo archivo
    await uploadBytes(storageRef, file);

    // obteniendo url de la imagen
    const imageUrl = await getDownloadURL(ref(storage, file.name));

    return imageUrl;
  } catch (error) {
    // console.log(error)
  }
};

// Delete image in storage
export const deleteImageStorage = async (img) => {
  try {
    const desertRef = ref(storage, img);
    const refDelete = await deleteObject(desertRef);
    return refDelete;
  } catch (error) {
    // console.log(error);
  }
};

// Submit file
export const sendFile = async (nameFile, imgURL, description, category) => {
  try {
    const files = await addDoc(collection(db, "products"), {
      name: nameFile,
      img: imgURL,
      description: description,
      category: category,
    });

    return files;
  } catch (error) {
    // console.log(error)
  }
};

// update function
export const updateProduct = async (productName, description, id) => {
  try {
    const product = doc(db, "products", id);
    const data = {
      name: productName,
      description: description,
    };
    const updateData = await updateDoc(product, data);

    return updateData;
  } catch (error) {
    // console.log(error)
  }
};

// Get product by id
export const getProduct = async (id) => {
  try {
    const productById = await getDoc(doc(db, "products", id));
    return productById;
  } catch (error) {
    // console.log(error)
  }
};
