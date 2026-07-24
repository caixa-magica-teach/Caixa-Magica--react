import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Quando o site abre, tenta buscar se já existe um usuário salvo no localStorage
  const [user, setUser] = useState(() => {
    const usuarioSalvo = localStorage.getItem("caixa_magica_user");
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  });

  // Função para fazer LOGIN e salvar no computador da pessoa
  const login = (dadosUsuario) => {
    setUser(dadosUsuario);
    localStorage.setItem("caixa_magica_user", JSON.stringify(dadosUsuario));
  };

  // Função para fazer LOGOUT (Sair) e apagar a memória
  const logout = () => {
    setUser(null);
    localStorage.removeItem("caixa_magica_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, logado: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para facilitar o uso nos componentes
export const useAuth = () => useContext(AuthContext);
