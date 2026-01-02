import { useFavoriteContext } from "../../context/FavoriteContext/useFavoriteContext.js";

export default function Favorite() {
    const { favoriteItems } = useFavoriteContext();

    return (
        <section>
            <h1>Favorite</h1>
            {favoriteItems.length === 0 ? (
                <p>No hay productos favoritos.</p>
            ) : (favoriteItems.map(item => (
                <div key={item.id}>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                </div>
            )))}
        </section>
    )
}