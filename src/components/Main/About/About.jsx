import React from 'react';
import './About.css';

export default function About(){
    return(
        <section id="section-about" className='about-container'>
            <div className='about-text'>
                <h1 className='about-text-title'>About us</h1>
                <h6 className='about-text-subtitle'>"Style That Inspires. Quality That Endures</h6>
                <p className='about-text-description'>At EcommercePlace, we believe clothes do more than just dress you—they tell your story. We design and curate pieces that blend modern trends with timeless comfort and authenticity, empowering every customer to find their unique voice. Each collection is thoughtfully designed to offer you quality, innovative style, and accessible prices. Because we believe fashion should be an experience without limits.</p>
            </div>
            <div className='about-features'>
                <div className='about-feature-item'>
                    <h4 className='feature-item-title'><img src="./assets/category.svg" alt="" />Variety</h4>
                    <p className='feature-item-text'>Versatile Styles. Your Style, Your Rules. From Casual to Chic.</p>
                </div>
                <div className='about-feature-item'>
                    <h4 className='feature-item-title'><img src="./assets/handshake.svg" alt="" />Customer proximity</h4>
                    <p className='feature-item-text'>Personalized Support. A Partnership in Style. Here for You.</p>
                </div>
                <div className='about-feature-item'>
                    <h4 className='feature-item-title'><img src="./assets/delivery_truck.svg" alt="" />Fast Shipping</h4>
                    <p className='feature-item-text'>Swift Shipping. Fast & Reliable Delivery. Your Order, Your Way, On Time.</p>
                </div>
            </div>
        </section>
    )
}
