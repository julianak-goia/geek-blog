import { useContext, createContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children, value }) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// pega o valor do contexto
export function useAuthValue() {
  return useContext(AuthContext);
}
