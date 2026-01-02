import { useState, useEffect } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext/useAuthContext";
import "./Login.css";

export default function Login() {
  const [userForm, setUserForm] = useState({ email: "", password: "" });
  const { user, login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from;

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate(from || "/admin/alta-productos", { replace: true });
      } else {
        navigate(from || "/", { replace: true });
      }
    }
  }, [user, navigate, from]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(userForm.email, userForm.password);
    if (success) {
      navigate("/admin/alta-productos");
    } else {
      alert("Credenciales incorrectas");
      setUserForm({ email: "", password: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className='login-logo-container'>
        <img src="/assets/logo.png" alt="logo-ModeaVelour" className='login-logo' />
      </div>

      <h2>Inicio de Sesión</h2>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={userForm.email}
          name="email"
          placeholder="Ingresa tu usuario"
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          placeholder="Ingresa tu contraseña"
          value={userForm.password}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div>
        <button type="submit">Iniciar Sesión</button>
      </div>
    </form>
  );
}
