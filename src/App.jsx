// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Catalogo from "./pages/catalogo/Catalogo";
import ProductDetail from "./pages/product-detail/ProductDetail";
import Carrinho from "./pages/Carrinho";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/produto/:id" element={<ProductDetail />} />
      <Route path="/Carrinho" element={<Carrinho />} />
    </Routes>
  );
}
