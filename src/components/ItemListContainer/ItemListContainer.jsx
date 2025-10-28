import { ItemContext } from '../Item/ItemContextDef.jsx';
import { useContext } from 'react';
import ItemList from '../ItemList/ItemList.jsx'
import './ItemListContainer.css'

export default function ItemListContainer({ titulo }){
    const { products } = useContext(ItemContext);

    return(
        <section id="section-products" className="section-products">
            <h1 className='section-product-title'>{titulo}</h1>
            <ItemList list={products}/>
        </section>
    )
}