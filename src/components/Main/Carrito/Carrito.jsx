import React, { useContext } from 'react'
import { CarritoContext } from './CarritoContextDef.jsx';
import './Carrito.css';
import ProductList from '../ProductList/ProductList.jsx'

export default function Carrito(){
    const { carritoCompra } = useContext(CarritoContext);

    return(
        <div>
            <main className='carrito-hero'>
                    <section className='carrito-hero-section'>
                        <div className='carrito-hero-titulo'>
                            <h1>Shopping Cart</h1>
                        </div>
                        <div className='carrito-hero-productos'>
                            {carritoCompra.length < 1 ? <span>El carrito está vacío</span> :(/* si existen productos los mostramos, sino mostramos mensaje */
                                <ProductList list={carritoCompra}/>)}
                        </div>
                        <div className='carrito-hero-subtotal'>
                            <h2>Subtotal({carritoCompra.length} {carritoCompra.length > 1 ? "items":"item"}): ${carritoCompra.reduce((total, product) => total + product.price, 0)}</h2>
                        </div>
                    </section>
                    <aside className='carrito-hero-aside'>
                        <div className='carrito-hero-resumen'>
                            <h2>Resumen de la compra</h2>
                            <p>Total de productos: {carritoCompra.length}</p>
                            <p>Subtotal: ${carritoCompra.reduce((total, product) => total + product.price, 0)}</p>
                            <button>Proceed to checkout</button>
                        </div>
                    </aside>
            </main>   
        </div>
    )
    
}
