//import { ItemContext } from '../Item/ItemContextDef.jsx';
//import { useContext } from 'react';
//import ItemList from '../ItemList/ItemList.jsx'
//import './ItemListContainer.css'
//
//export default function ItemListContainer({ titulo }){
//    const { products } = useContext(ItemContext);
//
//    return(
//        <section id="section-products" className="section-products">
//            <h1 className='section-product-title'>{titulo}</h1>
//            <ItemList list={products}/>
//        </section>
//    )
//}

import { useEffect, useState } from "react";
import { ItemList } from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { getProducts } from "../../services/products";

import "./ItemListContainer.css";

export const ItemListContainer = ({ titulo }) => {
  const [products, setProducts] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    getProducts(category)
      .then((data) => {setProducts(data);})
      .catch((error) => {console.error(error);});
  }, [category]);

  //Si hay categoria en params, uso esa como titulo
  titulo = category ?  category : titulo;

  return (
    <section className="container" id="section-products">
      <h1 className="title">{titulo}</h1>
      <ItemList lista={products} />
    </section>
  );
};