import React, { useContext } from 'react'
import Navbar from './nav/Navbar'
import './Hero.css';
import { CarritoContext } from '../Main/Carrito/CarritoContextDef.jsx';

// Componente que representa el encabezado de la aplicación, incluyendo el logo y la barra de navegación
export default function Hero(){
    const { carritoCompra } = useContext(CarritoContext);
    return(
        <header className='hero-container'>
            <div className='hero-wrapper'>
                <div className='hero-logo-container'>
                    <img src="assets/logo.png" alt="logo-ModeaVelour" className='hero-logo'/>
                </div>
                <div className="hero-searchbar-container">
                    <input type="text" placeholder='Search product...' className='searchbar'/>
                </div>
                <div className='hero-navbar-container'>
                    <Navbar CarritoCompra={carritoCompra}/>
                </div>
            </div>
        </header>
    )
}
