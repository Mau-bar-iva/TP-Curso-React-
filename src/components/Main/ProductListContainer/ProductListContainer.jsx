import { ProductContext } from '../Product/ProductContextDef.jsx';
import { useContext } from 'react';
import ProductList from '../ProductList/ProductList.jsx'
import './ProductListContainer.css'

export default function ProductListContainer({ titulo }){
    const { products } = useContext(ProductContext);

    return(
        <section id="section-products" className="section-products">
            <h1 className='section-product-title'>{titulo}</h1>
            <ProductList list={products}/>
        </section>
    )
}