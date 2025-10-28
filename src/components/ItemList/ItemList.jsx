import Item from '../Item/Item.jsx'
import { Link } from 'react-router-dom'
import './ItemList.css'

const ItemList = ({ list }) => {

    return(
        <>
            {list.length ? (
                list.map((prod)=>(
                    <Item key={prod.id} {...prod}>
                        <Link to={`/products/${prod.id}`} className='productListBtnDetail'><button>Ver Detalle</button></Link>
                    </Item>
                ))
            ):(
                <p>No hay productos</p>
            )}
        </>
    )
}

export default ItemList