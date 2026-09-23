import { Link } from 'react-router-dom';
import { useFavoriteContext } from '../../context/FavoriteContext/useFavoriteContext.js';
import { Item } from '../Item/Item.jsx';

export default function Favorite() {
    const { favoriteItems, removeFromFavorite } = useFavoriteContext();

    const handleRemove = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        removeFromFavorite(id);
    };

    return (
        <section className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 lg:px-10">
            <h1 className="mb-6 font-serif text-4xl font-medium text-stone-900">Favorite</h1>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {favoriteItems.length === 0 ? (
                    <p className="col-span-full rounded-[24px] border border-dashed border-stone-300 bg-white p-8 text-stone-600">
                        No hay productos favoritos.
                    </p>
                ) : (
                    favoriteItems.map((item) => (
                        <Link to={`/detail/${item.id}`} key={item.id} className="block transition hover:-translate-y-1">
                            <Item key={item.id} {...item}>
                                <button
                                    type="button"
                                    className="mt-2 w-fit rounded-full border border-stone-300 bg-white px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-stone-700 transition hover:border-stone-500"
                                    onClick={(e) => handleRemove(e, item.id)}
                                >
                                    Remove from favorite
                                </button>
                            </Item>
                        </Link>
                    ))
                )}
            </div>
        </section>
    );
}