import React from 'react';
import './Home.css';
import Banner from './Banner';
import CategoriesBar from './CategoriesNav.jsx';

function Home() {

    return (
        <section id="section-home" className='main-home-container'>
            <section className='home-container'>
                <Banner 
                Titulo="Moda Sostenible" 
                Descripcion="Descubre las últimas tendencias en moda sostenible con nuestra nueva colección ecológica." 
                />
            </section>
            <section>
                <CategoriesBar />
            </section>
        </section>
    )
}

export default Home;