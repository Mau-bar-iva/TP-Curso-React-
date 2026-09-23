import { useEffect, useState } from 'react';
import { ItemList } from '../ItemList/ItemList';
import { getProducts } from '../../services/products';

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

  if (loading) return <p className="px-6 py-8 text-stone-600">Cargando productos...</p>;

  if (mode === 'carousel') {
    return <ItemList lista={products} horizontal />;
  }

  return <ItemList lista={products} />;
};