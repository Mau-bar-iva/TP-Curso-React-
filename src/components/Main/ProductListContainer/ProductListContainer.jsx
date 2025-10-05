import { ProductContext } from '../Product/ProductContextDef.jsx';
import { useContext } from 'react';
import ProductList from '../ProductList/ProductList.jsx'
import './ProductListContainer.css'

export default function ProductListContainer({ titulo }){
    const { productos } = useContext(ProductContext);

    return(
        <section id="section-product" className="product-container">
            <h1 className='section-product-title'>{titulo}</h1>
            <ProductList list={productos}/>
        </section>
    )
}