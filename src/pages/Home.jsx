// src/Home.jsx
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Categorias from "../components/Categorias";
import ProdutosNovos from "../components/NewProducts";
import MaisVendido from "../components/MostRented";
import Rodape from "../components/Rodape";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <main>
        <Banner />
        <Categorias />
        <ProdutosNovos />
        <MaisVendido />
      </main>
      <Rodape />
    </div>
  );
}
