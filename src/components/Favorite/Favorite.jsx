import { useFavoriteContext } from "../../context/FavoriteContext/useFavoriteContext.js";
import { Item } from "../Item/Item.jsx"
export default function Favorite() {
    const { favoriteItems } = useFavoriteContext();
    console.log(favoriteItems)
    return (
        <section>
            <h1>Favorite</h1>
            {favoriteItems.length === 0 ? (
                <p>No hay productos favoritos.</p>
            ) : (favoriteItems.map(item => (
                <Item key={item.id} {...item} />
            )))}
        </section>
    )
}