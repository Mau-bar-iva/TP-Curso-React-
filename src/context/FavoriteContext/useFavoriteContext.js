import { useContext } from "react";
import FavoriteContext from "./FavoriteContext";

export const useFavoriteContext = () => {
    return useContext(FavoriteContext);
}