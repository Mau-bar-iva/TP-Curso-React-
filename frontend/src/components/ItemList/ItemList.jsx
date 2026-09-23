import { Link, useNavigate } from 'react-router-dom';
import { Item } from '../Item/Item';
import { useFavoriteContext } from '../../context/FavoriteContext/useFavoriteContext.js';
import { useAuthContext } from '../../context/AuthContext/useAuthContext.js';

export const ItemList = ({ lista, horizontal = false }) => {
  const { favoriteItems, addToFavorite, removeFromFavorite } = useFavoriteContext();
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();

  const handleAddFavorite = (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;

    if (!user) {
      navigate('/admin');
      return;
    }

    const isFavorite = favoriteItems.some((fav) => fav.id === item.id);

    if (isFavorite) {
      removeFromFavorite(item.id);
    } else {
      addToFavorite(item);
    }
  };

  return (
    <div
      className={
        horizontal
          ? 'flex min-w-max gap-5 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden'
          : 'grid w-full justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }
    >
      {lista.length ? (
        lista.map((prod) => {
          const isFav = favoriteItems.some((fav) => fav.id === prod.id);

          return (
            <Link to={`/detail/${prod.id}`} key={prod.id} className="block w-full transition duration-200 hover:-translate-y-1">
              <Item {...prod}>
                <button
                  type="button"
                  className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 bg-white/90 text-stone-900 shadow-sm transition hover:scale-105"
                  onClick={(e) => handleAddFavorite(e, prod)}
                  aria-label={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    width="22"
                    height="22"
                    className="overflow-visible"
                  >
                    <path
                      className={isFav ? 'fill-[#a63d34] opacity-100' : 'fill-transparent opacity-0'}
                      d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"
                    />
                    <path
                      className={`fill-none ${isFav ? 'stroke-[#a63d34] stroke-[80]' : 'stroke-[#221d17] stroke-[80]'}`}
                      d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"
                    />
                  </svg>
                </button>
              </Item>
            </Link>
          );
        })
      ) : (
        <p className="col-span-full py-10 text-center text-stone-600">No hay productos</p>
      )}
    </div>
  );
};