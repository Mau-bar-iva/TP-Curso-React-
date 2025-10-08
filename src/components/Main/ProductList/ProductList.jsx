import Product from '../Product/Product.jsx'
import { Link } from 'react-router-dom'
import './ProductList.css'

const ProductList = ({ list }) => {

    return(
        <>
            {list.length ? (
                list.map((prod)=>(
                    <Product key={prod.id} {...prod}>
                        <Link to={`/products/${prod.id}`} className='productListBtnDetail'><button>Ver Detalle</button></Link>
                    </Product>
                ))
            ):(
                <p>No hay productos</p>
            )}
        </>
    )
}

export default ProductList