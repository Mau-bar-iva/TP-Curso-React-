import { Link } from 'react-router-dom';
import { Item } from '../Item/Item';
import { useFavoriteToggle } from '../../context/FavoriteContext/useFavoriteToggle.js';
import { AnimatePresence, motion as Motion } from 'framer-motion';

export const ItemList = ({ lista, horizontal = false }) => {
  const { isFavorite, toggle } = useFavoriteToggle();

  return (
    <div
      className={
        horizontal
          ? 'flex min-w-max gap-5 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden'
          : 'grid w-full justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }
    >
      {lista.length ? (
        <AnimatePresence initial={false}>
          {lista.map((prod, index) => {
            const delay = Math.min(index * 0.03, 0.3);
            const shouldReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            return (
              <Motion.div
                key={prod.id}
                initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                animate={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                exit={shouldReduce ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: shouldReduce ? 0 : 0.35, delay }}
                className="block w-fit"
              >
                <Link to={`/detail/${prod.id}`} className="transition duration-200 hover:-translate-y-1">
                  <Item
                    {...prod}
                    isFavorite={isFavorite(prod.id)}
                    onToggleFavorite={() => toggle(prod)}
                  />
                </Link>
              </Motion.div>
            );
          })}
        </AnimatePresence>
      ) : (
        <p className="col-span-full py-10 text-center text-stone-600">No hay productos</p>
      )
      }
    </div >
  );
};