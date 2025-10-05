import Product from '../Product/Product.jsx'
import { CarritoContext } from '../Carrito/CarritoContextDef.jsx'
import { useContext } from 'react'
import './ProductDetail.css'

export default function ProductDetail({ detail }){
    const { setCarritoCompra } = useContext(CarritoContext)

    return(
        <Product {...detail}>
            <button onClick={() => setCarritoCompra(prev => [...prev, detail])} className='btn-addproduct'>
                <span>Agregar al carrito</span>
            </button>
        </Product>
    )
}