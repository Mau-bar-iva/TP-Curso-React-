import React from 'react';
import Home from '../home/Home.jsx';
import ItemListContainer from '../ItemListContainer/ItemListContainer.jsx';
import About from '../About/About.jsx';
import Contact from '../Contact/Contact.jsx';
import './MainApp.css';

// Componente principal que engloba las secciones Home y Productos
function MainApp() {

    return (
        <main className='main-app-container'>
            <Home />
            <ItemListContainer titulo="Productos" />
            <About />
            <Contact />
        </main>
    );
}

export default MainApp;