import { Link } from "react-router-dom"
import { useFavoriteContext } from "../../context/FavoriteContext/useFavoriteContext.js";
import { Item } from "../Item/Item.jsx"
import "./favorite.css"

export default function Favorite() {
    const { favoriteItems, removeFromFavorite } = useFavoriteContext();
    console.log(favoriteItems)

    const handleRemove = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        removeFromFavorite(id);
    }

    return (
        <section className="section-favorite">
            <h1 className="favorite-title">Favorite</h1>
            <div className="favorite-cards-container">
                {favoriteItems.length === 0 ? (
                    <p>No hay productos favoritos.</p>
                ) : (favoriteItems.map(item => (
                    <Link to={`/detail/${item.id}`} key={item.id}>
                        <Item key={item.id} {...item}>
                            <button className="item-remove-btn" onClick={(e) => handleRemove(e, item.id)}>Remove from favorite</button>
                        </Item>
                    </Link>
                )))}
            </div>
        </section>
    )
}