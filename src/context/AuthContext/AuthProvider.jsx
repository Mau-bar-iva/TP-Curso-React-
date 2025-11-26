import { useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem("session");
    if (saved) {
      return JSON.parse(saved);
    } else{
      return null;
    }
  });

  const login = (username, password) => {
    if(username === "admin" && password === "1234"){
      const session = { username };
      setUser(session);

      sessionStorage.setItem("session", JSON.stringify(session));

      return true
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem("session");
    setUser(null);
    alert("You have been logged out.");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
