import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext/useAuthContext';

export default function Login() {
  const [userForm, setUserForm] = useState({ email: '', password: '' });
  const { user, login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from;

  useEffect(() => {
    if (user) {
      if (user.isAdmin) {
        navigate(from || '/admin/alta-productos', { replace: true });
      } else {
        navigate(from || '/', { replace: true });
      }
    }
  }, [user, navigate, from]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = await login(userForm.email, userForm.password);
    if (userData) {
      if (userData.isAdmin) {
        navigate(from || '/admin/alta-productos', { replace: true });
      } else {
        navigate(from || '/', { replace: true });
      }
    } else {
      alert('Credenciales incorrectas');
      setUserForm({ email: '', password: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md rounded-[30px] border border-stone-200 bg-white p-6 shadow-[0_25px_60px_rgba(87,72,58,0.08)] sm:p-8">
      <div className="mb-6 flex justify-center">
        <img src="/assets/logo.png" alt="logo-ModeaVelour" className="h-[54px] w-auto object-contain" />
      </div>

      <h2 className="mb-6 text-center font-serif text-3xl font-medium text-stone-900">Inicio de Sesión</h2>

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-700">Email</label>
          <input
            type="email"
            value={userForm.email}
            name="email"
            placeholder="Ingresa tu usuario"
            onChange={handleChange}
            className="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-stone-800 outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-[#d7c8b6]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-700">Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            value={userForm.password}
            onChange={handleChange}
            className="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-stone-800 outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-[#d7c8b6]"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-stone-900 px-4 py-3 text-sm font-medium uppercase tracking-[0.18em] text-white transition hover:bg-stone-700"
        >
          Iniciar Sesión
        </button>
      </div>
    </form>
  );
}
