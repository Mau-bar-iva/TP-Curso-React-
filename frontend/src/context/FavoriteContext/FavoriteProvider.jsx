import { useEffect, useState } from "react";
import FavoriteContext from "./FavoriteContext";
import { notify } from "../../utils/toast";

export const FavoriteProvider = ({ children }) => {
    // 1. Inicialización leyendo de localStorage para que persista al recargar (F5)
    const [favoriteItems, setFavoriteItems] = useState(() => {
        try {
            const saved = localStorage.getItem("modeavelour_favorites");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // 2. Sincronización automática con localStorage
    useEffect(() => {
        try {
            localStorage.setItem("modeavelour_favorites", JSON.stringify(favoriteItems));
        } catch (error) {
            console.error("Favorite localStorage error:", error);
        }
    }, [favoriteItems]);

    // 3. Helper para verificar si un producto ya es favorito
    const isFavorite = (itemId) => {
        return favoriteItems.some((item) => item.id === itemId);
    };

    // 4. Conmutar favorito (agregar / quitar) con toast reactivo
    const toggleFavorite = (item) => {
        if (isFavorite(item.id)) {
            setFavoriteItems((prev) => prev.filter((i) => i.id !== item.id));
            notify({ message: `${item.name || 'Prenda'} eliminada de favoritos`, type: 'info', imageUrl: item.imageUrl });
        } else {
            setFavoriteItems((prev) => [...prev, item]);
            notify({ message: `${item.name || 'Prenda'} añadida a tus favoritos`, type: 'success', imageUrl: item.imageUrl });

        }
    };

    const addToFavorite = (item) => {
        if (!isFavorite(item.id)) {
            setFavoriteItems((prev) => [...prev, item]);
            notify(`${item.name || "Prenda"} guardada en favoritos`, "success");
        }
    };

    const removeFromFavorite = (itemId) => {
        const removed = favoriteItems.find((item) => item.id === itemId);
        setFavoriteItems((prev) => prev.filter((item) => item.id !== itemId));
        notify({ message: 'Eliminado de favoritos', type: 'info', imageUrl: removed?.imageUrl });
    };

    const getTotalFavorites = () => favoriteItems.length;

    return (
        <FavoriteContext.Provider
            value={{
                favoriteItems,
                getTotalFavorites,
                isFavorite,
                toggleFavorite,
                addToFavorite,
                removeFromFavorite,
            }}
        >
            {children}
        </FavoriteContext.Provider>
    );
};