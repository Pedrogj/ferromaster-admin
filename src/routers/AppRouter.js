import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NewProduct } from "../Components/new-product/NewProduct";
import { Navbar } from "../Components/navbar/Navbar";
import { ListProduct } from "../Components/list-products/ListProduct";
import { EditProduct } from "../Components/edit-product/EditProduct";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ListProduct />} />
        <Route path="/new-product" element={<NewProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
};
