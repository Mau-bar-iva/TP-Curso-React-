import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext/useAuthContext';

function RutaProtegida({ children, role }) {
    const { user, loading } = useAuthContext();
    const location = useLocation();

    console.log("USER EN RUTA:", user);
    console.log("ROLE ESPERADO:", role);

    if (loading) return null;

    if (!user) {
        return <Navigate to="/admin" state={{ from: location.pathname }} replace />;
    }

    if (role && user.role !== role) {
        return <Navigate to="/" replace />
    }

    return children;
}

export default RutaProtegida;
