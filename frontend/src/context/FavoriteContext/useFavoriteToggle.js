import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../AuthContext/useAuthContext';
import { useFavoriteContext } from './useFavoriteContext';
import { notify } from '../../utils/toast';

export const useFavoriteToggle = () => {
    const { favoriteItems, toggleFavorite } = useFavoriteContext();
    const { user, loading } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();

    // Set: lookup O(1) por card, en vez de .some() por cada producto renderizado
    const favoriteIds = useMemo(
        () => new Set(favoriteItems.map((item) => item.id)),
        [favoriteItems]
    );

    const isFavorite = useCallback((id) => favoriteIds.has(id), [favoriteIds]);

    const toggle = useCallback(
        (product) => {
            if (loading) return;

            if (!user) {
                notify('Inicia sesión para guardar en favoritos', 'info');
                navigate('/admin', { state: { from: location.pathname + location.search } });
                return;
            }

            toggleFavorite(product);
        },
        [loading, user, navigate, location, toggleFavorite]
    );

    return { isFavorite, toggle };
};