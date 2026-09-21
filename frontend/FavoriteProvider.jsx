import { useState } from "react";
import FavoriteContext from "./FavoriteContext";

export const FavoriteProvider = ({ children }) => {
    const [favoriteItems, setFavoriteItems] = useState([]);

    const getTotalItems = () => {
        return favoriteItems.length;
    }

    const addToFavorite = (item) => {
        setFavoriteItems([...favoriteItems, item]);
    }
    const removeFromFavorite = (itemId) => {
        setFavoriteItems(favoriteItems.filter(item => item.id !== itemId));
    }
    return (
        <FavoriteContext.Provider value={{ favoriteItems, getTotalItems, addToFavorite, removeFromFavorite }}>
            {children}
        </FavoriteContext.Provider>
    )
}