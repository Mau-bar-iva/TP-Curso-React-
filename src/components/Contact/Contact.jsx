import React from 'react';
import './Contact.css'

export default function Contact(){
    return(
        <section id="section-contact" className="contact-section">
              <div className="contact-intro">
                <h1 className="contact-title">Estamos para ayudarte</h1>
                <p className="contact-description">
                  Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.
                  Nuestro equipo de atención al cliente está aquí para ayudarte en todo lo que necesites.
                </p>
              </div>

              <div className="contact-info">
                <h2 className="contact-info-title">Información de Contacto</h2>
              </div>

              <div className="contact-form-container">
                <form action="https://formspree.io/f/xrbyqglr" method="POST" className="contact-form">
                  <h1 className="form-title">Contáctanos</h1>

                  <label htmlFor="nombre" className="form-label">Nombre:</label>
                  <input type="text" id="nombre" name="nombre" className="form-input" required />

                  <label htmlFor="email" className="form-label">Email:</label>
                  <input type="email" id="email" name="email" className="form-input" required />

                  <label htmlFor="mensaje" className="form-label">Mensaje:</label>
                  <textarea id="mensaje" name="mensaje" className="form-textarea" required></textarea>

                  <button type="submit" className="form-button">Enviar</button>
                </form>
              </div>
            </section>

        
    )
}
