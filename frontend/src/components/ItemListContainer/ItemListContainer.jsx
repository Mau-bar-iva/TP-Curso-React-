import { useEffect, useState } from 'react';
import { ItemList } from '../ItemList/ItemList';
import { getProducts } from '../../services/products';
import ProductCardSkeleton from '../Skeleton/ProductCardSkeleton';

export const ItemListContainer = ({ category, orderBy, mode = 'grid' }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getProducts()
      .then((data) => {
        let result = data;

        if (category) {
          result = data.filter((p) => p.category?.includes(category));
        }

        if (orderBy) {
          result = [...result].sort((a, b) => {
            if (orderBy === 'price-asc') return a.price - b.price;
            if (orderBy === 'price-desc') return b.price - a.price;
            if (orderBy === 'name-asc') return a.name.localeCompare(b.name);
            if (orderBy === 'name-desc') return b.name.localeCompare(a.name);
            if (orderBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
            if (orderBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
            return 0;
          });
        }

        setProducts(result);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category, orderBy]);

  if (loading)
    return (
      <div aria-busy="true" aria-live="polite">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );

  if (mode === 'carousel') {
    return <ItemList lista={products} horizontal />;
  }

  return <ItemList lista={products} />;
};