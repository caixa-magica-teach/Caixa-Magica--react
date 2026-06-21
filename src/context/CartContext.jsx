// src/context/CartContext.jsx
// Contexto global do carrinho — envolve toda a aplicação no App.jsx
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [itens, setItens] = useState([]);

  // Adiciona ou atualiza item no carrinho
  const adicionarItem = (brinquedo, dias, precoTotal) => {
    setItens((prev) => {
      const existe = prev.find((i) => i.id === brinquedo.id);
      if (existe) {
        // se já existe, atualiza o período
        return prev.map((i) =>
          i.id === brinquedo.id ? { ...i, dias, precoTotal } : i
        );
      }
      return [
        ...prev,
        {
          id:          brinquedo.id,
          nome:        brinquedo.nome,
          imagem:      brinquedo.imagens?.[0]?.imagem_url || null,
          valorBase:   parseFloat(brinquedo.valor_base),
          dias,
          precoTotal,
        },
      ];
    });
  };

  // Remove item do carrinho
  const removerItem = (id) =>
    setItens((prev) => prev.filter((i) => i.id !== id));

  // Limpa o carrinho inteiro
  const limparCarrinho = () => setItens([]);

  // Total geral
  const total = itens.reduce((acc, i) => acc + i.precoTotal, 0);

  // Quantidade de itens
  const quantidade = itens.length;

  return (
    <CartContext.Provider value={{ itens, adicionarItem, removerItem, limparCarrinho, total, quantidade }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook para usar o carrinho em qualquer componente
export function useCart() {
  return useContext(CartContext);
}
