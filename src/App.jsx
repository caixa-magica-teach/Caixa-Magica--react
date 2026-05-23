import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Catalogo from "./pages/catalogo/Catalogo";
import ProductDetail from "./pages/product-detail/ProductDetail";
import "./App.css";

export default function App() {
  return (
    <Routes>
      {/* Rota da Página Inicial (Home) */}
      <Route path="/" element={<Home />} />

      {/* Rota do Login (ajustada para ficar mais limpa) */}
      <Route path="/login" element={<Login />} />

      {/* Suas novas rotas */}
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/produto/:id" element={<ProductDetail />} />
    </Routes>
  );
}