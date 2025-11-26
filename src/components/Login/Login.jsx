import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext/useAuthContext";
import "./Login.css";

export default function Login() {
  const [userForm, setUserForm] = useState({ name: "", password: "" });
  const { user, login } = useAuthContext();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/admin/alta-productos" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(userForm.name, userForm.password);
    if(success){
      navigate("/admin/alta-productos");
    }else{
      alert("Credenciales incorrectas");
      setUserForm({ name: "", password: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>

      <div>
        <label>Usuario:</label>
        <input
          type="text"
          value={userForm.name}
          name="name"
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={userForm.password}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}
