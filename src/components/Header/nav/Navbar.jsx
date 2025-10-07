import React, { useContext } from 'react'

import { HashRouter as Link } from 'react-router-dom';
import './Navbar.css';
import { CarritoContext } from '../../Main/Carrito/CarritoContextDef';

function Navbar(){
    const { carritoCompra } = useContext(CarritoContext)
    return (
        <nav className='nav'>
            <ul className='nav-list-container'>
                <li className='nav-list-item home-item'><Link to="/#section-home">Home</Link></li>
                <li className='nav-list-item products-item'><a href="#section-product">Products</a></li>
                <li className='nav-list-item about-item'><a href="#section-about">About</a></li>
                <li className='nav-list-item contacts-item'><a href="#section-contact">Contact</a></li>
                <li className='nav-list-item login-item'>
                    <Link to="/">
                        <img src="assets/login.svg" alt="" className='login-icon'/>
                            Login
                    </Link>
                </li>
                <li className='nav-list-item carrito-item'>
                    <Link to="/carrito" style={{display:"flex", alignItems:"center",justifyContent:"center",padding:"8px 10px"}}>
                        <img src="assets/carrito.svg" style={{color:"#000", border:"none", borderRadius:"10px"}} alt="" />
                        <span style={{color:"#ff6f61", fontSize:"20px"}}>{carritoCompra.length}</span>
                    </Link>
                </li>
            </ul>
            
        </nav>
    )
}

export default Navbar