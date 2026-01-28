import { useEffect, useState } from "react";
import { ItemList } from "../ItemList/ItemList";
import { getProducts } from "../../services/products";

import "./ItemListContainer.css";

export const ItemListContainer = ({ category, orderBy }) => {
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

        if (orderBy) {
          const sorted = [...data].sort((a, b) => {
            if (orderBy === "price-asc") {
              return a.price - b.price;
            } else if (orderBy === "price-desc") {
              return b.price - a.price;
            } else if (orderBy === "name-asc") {
              return a.name.localeCompare(b.name);
            } else if (orderBy === "name-desc") {
              return b.name.localeCompare(a.name);
            } else if (orderBy === "newest") {
              return new Date(b.createdAt) - new Date(a.createdAt);
            } else if (orderBy === "oldest") {
              return new Date(a.createdAt) - new Date(b.createdAt);
            }
          });
          setProducts(sorted);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));

  }, [category, orderBy]);

  if (loading) return <p>Cargando productos...</p>;

  return <ItemList lista={products} />;
};