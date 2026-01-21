import { useEffect, useState } from "react";
import { ItemList } from "../ItemList/ItemList";
import { getProducts } from "../../services/products";

import "./ItemListContainer.css";

export const ItemListContainer = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const filters = {};

    if (category) {
      filters.category = category;
    }

    getProducts()
      .then((data) => {
        if (category) {
          const filtered = data.filter(p =>
            p.category?.includes(category)
          );
          setProducts(filtered);
        } else {
          setProducts(data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));

  }, [category]);

  if (loading) return <p>Cargando productos...</p>;

  return <ItemList lista={products} />;
};