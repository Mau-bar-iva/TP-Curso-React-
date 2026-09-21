
import { Nav } from '../Nav/Nav.jsx'
import './Header.css';
import { Link } from 'react-router-dom';

// Componente que representa el encabezado de la aplicación, incluyendo el logo y la barra de navegación
export function Header() {

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <header className='hero-container'>
            <div className='hero-wrapper'>
                <div className='hero-logo-container'>
                    <Link to={"/"} onClick={scrollToTop}>
                        <img src="/assets/logo.png" alt="logo-ModeaVelour" className='hero-logo' />
                    </Link>
                </div>

                <div className='hero-navbar-container'>
                    <Nav />
                </div>
            </div>
        </header>
    )
}
