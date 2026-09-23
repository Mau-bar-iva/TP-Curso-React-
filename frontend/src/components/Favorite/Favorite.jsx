import { useFavoriteContext } from '../../context/FavoriteContext/useFavoriteContext.js';
import { Item } from '../Item/Item.jsx';

export default function Favorite() {
    const { favoriteItems, removeFromFavorite } = useFavoriteContext();

    return (
        <section className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 lg:px-10">
            <div className="mb-6 flex items-end justify-between gap-3">
                <h1 className="font-serif text-4xl font-medium text-stone-900">Favoritos</h1>
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone-500">
                    {favoriteItems.length} {favoriteItems.length === 1 ? 'artículo' : 'artículos'}
                </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {favoriteItems.length === 0 ? (
                    <div className="col-span-full rounded-[24px] border border-dashed border-stone-300 bg-white p-8 text-stone-600">
                        <p className="text-base">No hay productos favoritos.</p>
                    </div>
                ) : (
                    favoriteItems.map((item) => (
                        <Item
                            key={item.id}
                            {...item}
                            isFavorite
                            linkTo={`/detail/${item.id}`}
                            onToggleFavorite={() => removeFromFavorite(item.id)}
                        />
                    ))
                )}
            </div>
        </section>
    );
}