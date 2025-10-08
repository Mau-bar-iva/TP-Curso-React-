import React from 'react'
import './Banner.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

function Banner({Titulo="", Descripcion="" }){
    const imagenes = [
        "/TP-Curso-React-/assets/slide1.png",
        "/TP-Curso-React-/assets/slide2.png",
        "/TP-Curso-React-/assets/slide3.png"
    ];

    const [indice, setIndice] = useState(0);
        
    useEffect(() => {
        const intervalo = setInterval(()=>{
            setIndice((prev)=>(prev + 1) % imagenes.length)
        }, 3000)

        return ()=> clearInterval(intervalo)

    }, [imagenes.length]);

    return(
        <div className='banner-container'>
            <div className='banner-img-container'>
              <div 
                className="banner-bg"
                style={{ backgroundImage: `url(${imagenes[indice]})` }}
              ></div>
              <img src={imagenes[indice]} alt={Titulo} className='banner-image'/>
            </div>
            <div className='banner-text-container'>
              <p className='banner-title'>{Titulo}</p>
              <h3 className='banner-description'>{Descripcion}</h3>
              <Link to="/#section-products">
                <button className="banner-btn">Descubrir productos</button>
              </Link>
            </div>
        </div>
    )
}

export default Banner