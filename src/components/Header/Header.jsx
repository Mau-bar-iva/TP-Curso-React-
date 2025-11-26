
import { Nav } from '../Nav/Nav.jsx'
import './Header.css';

// Componente que representa el encabezado de la aplicación, incluyendo el logo y la barra de navegación
export function Header(){
    return(
        <header className='hero-container'>
            <div className='hero-wrapper'>
                <div className='hero-logo-container'>
                    <img src="/public/assets/logo.png" alt="logo-ModeaVelour" className='hero-logo'/>
                </div>

                <div className='hero-navbar-container'>
                    <Nav />
                </div>
            </div>
        </header>
    )
}
