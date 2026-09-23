import { Link } from 'react-router-dom';

export const Item = ({
  id,
  name,
  price,
  oldPrice,
  description,
  imageUrl,
  category,
  variants,
  isNew,
  children,
  isFavorite = false,
  onToggleFavorite,
  linkTo,
}) => {
  const colors = variants ? [...new Set(variants.map((v) => v.color).filter(Boolean))] : [];
  const discount = oldPrice && oldPrice > price ? Math.round(100 - (price / oldPrice) * 100) : null;
  const fallbackImage = '/assets/logo.png';

  const handleImageError = (event) => {
    event.currentTarget.src = fallbackImage;
    event.currentTarget.onerror = null;
  };

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (onToggleFavorite) onToggleFavorite();
  };

  const content = (
    <>
      <div className="relative overflow-hidden bg-[#f7f4ef]">
        {(isNew || discount) && (
          <span
            className={`absolute left-3 top-3 z-20 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] ${discount ? 'bg-[#a63d34] text-white shadow-sm' : 'bg-stone-900 text-white'
              }`}
          >
            {discount ? `-${discount}%` : 'Nuevo'}
          </span>
        )}

        {onToggleFavorite && (
          <button
            type="button"
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            onClick={handleFavoriteClick}
            className={`absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-stone-200/80 bg-white/90 text-stone-600 shadow-[0_10px_20px_rgba(34,29,23,0.08)] backdrop-blur-sm transition-all duration-200 hover:border-[#A63D34]/40 hover:text-[#A63D34] active:scale-95 ${isFavorite ? 'text-[#A63D34]' : 'text-stone-600'
              }`}
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-4 w-4 transition-all duration-200`}
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke={isFavorite ? 'currentColor' : 'none'}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20.25s-7.5-4.35-9.5-8.64C1.3 9.39 2.95 5.25 6.9 5.25c2.11 0 3.34 1.02 4.1 2.05.76-1.03 2-2.05 4.1-2.05 3.95 0 5.6 4.14 4.4 6.36-2 4.29-9.5 8.64-9.5 8.64Z" />
            </svg>
          </button>
        )}

        <div className="relative aspect-[4/5] overflow-hidden bg-[#f7f4ef]">
          <img
            src={imageUrl || fallbackImage}
            alt={description || name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
            onError={handleImageError}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-4 pb-4 pt-3">
        {category && (
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone-500">
            {Array.isArray(category) ? category[0] : category}
          </p>
        )}

        {linkTo ? (
          <Link to={linkTo} className="block min-w-0">
            <h2 className="line-clamp-2 min-h-[2.8rem] font-serif text-[1.05rem] font-medium leading-[1.3] text-stone-900 transition-colors duration-200 hover:text-stone-600">
              {name}
            </h2>
          </Link>
        ) : (
          <h2 className="line-clamp-2 min-h-[2.8rem] font-serif text-[1.05rem] font-medium leading-[1.3] text-stone-900">
            {name}
          </h2>
        )}

        {colors.length > 0 && (
          <ul className="flex min-h-[20px] items-center gap-2" aria-label="Colores disponibles">
            {colors.slice(0, 5).map((c) => (
              <li
                key={c}
                className="h-3.5 w-3.5 rounded-full border border-stone-200"
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
            {colors.length > 5 && <li className="text-[10px] font-medium text-stone-600">+{colors.length - 5}</li>}
          </ul>
        )}

        {children && <div className="mt-auto w-full min-w-0 overflow-hidden">{children}</div>}

        <div className="mt-auto flex items-end justify-between gap-2">
          <div className="flex items-end gap-2">
            <p className="font-serif text-[1.4rem] font-medium leading-none text-stone-900 tabular-nums">${price}</p>
            {discount && <p className="text-xs text-stone-500 line-through">${oldPrice}</p>}
          </div>

          {id && !children && (
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-stone-500">Ver más</span>
          )}
        </div>
      </div>
    </>
  );

  return (
    <article className="group relative flex w-full max-w-[260px] shrink-0 flex-col overflow-hidden rounded-[28px] border border-[#e7e1d6] bg-white shadow-[0_12px_24px_rgba(34,29,23,0.06)] transition duration-200 hover:-translate-y-1 hover:border-stone-400 hover:shadow-[0_18px_35px_rgba(34,29,23,0.10)]">
      {linkTo ? <Link to={linkTo} className="block h-full">{content}</Link> : content}
    </article>
  );
};

export default Item;