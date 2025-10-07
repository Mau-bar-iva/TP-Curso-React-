import Product from '../Product/Product.jsx'
import { CarritoContext } from '../Carrito/CarritoContextDef.jsx'
import { Link } from 'react-router-dom'
import ProductDetail from "../ProductDetail/ProductDetail.jsx"
import './ProductList.css'
const ProductList = ({ list }) => {

    return(
        <>
            {list.length ? (
                list.map((prod)=>(
                    <Product key={prod.id} {...prod}>
                        <Link to={`/producto/${prod.id}`} className='productListBtnDetail'><button>Ver Detalle</button></Link>
                    </Product>
                ))
            ):(
                <p>No hay productos</p>
            )}
        </>
    )
}

export default ProductList