import { useEffect, useState } from "react";
import { ItemList } from "../ItemList/ItemList";
import { getProducts } from "../../services/products";

import "./ItemListContainer.css";

export const ItemListContainer = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts(category)
      .then((data) => { setProducts(data); })
      .catch((error) => { console.error(error); });
  }, [category]);

  return <ItemList lista={products} />
};