import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NewProduct } from "../Components/new-product/NewProduct";
import { Navbar } from "../Components/navbar/Navbar";
import { ListProduct } from "../Components/list-products/ListProduct";
import { EditProduct } from "../Components/edit-product/EditProduct";
import { route } from "./Routes";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={route.root} element={<ListProduct />} />
        <Route path={route.newProduct} element={<NewProduct />} />
        <Route path={route.editProduct} element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
};
