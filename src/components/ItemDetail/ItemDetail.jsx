import Item from '../Item/Item.jsx'
import { CarritoContext } from '../Carrito/CarritoContextDef.jsx'
import { useContext } from 'react'
import './ItemDetail.css'

export default function ItemDetail({ detail }){
    const { setCarritoCompra } = useContext(CarritoContext)

    return(
        <div className='productItem-container'>
            <Item {...detail}>
                <button onClick={() => setCarritoCompra(prev => [...prev, detail])} className='btn-addproduct'>
                    <span>Agregar al carrito</span>
                </button>
            </Item>
        </div>
        
    )
}