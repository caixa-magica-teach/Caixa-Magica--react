// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Catalogo from "./pages/catalogo/Catalogo";
import ProductDetail from "./pages/product-detail/ProductDetail";
import Carrinho from "./pages/Carrinho";
import AreaCliente from "./pages/area-cliente/AreaCliente";
import Admin from "./pages/admin/Admin";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    // 2. Envolva todas as rotas com o AuthProvider
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/produto/:id" element={<ProductDetail />} />
          <Route path="/carrinho" element={<Carrinho />} />{" "}
          <Route path="/area-cliente" element={<AreaCliente />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}
