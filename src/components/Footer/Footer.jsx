import "./Footer.css"

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Modea Velour</h4>
          <p>Moda, estilo y calidad.</p>
        </div>

        <div className="footer-section">
          <h4>Contacto</h4>
          <p>Email: contacto@modeavelour.com</p>
          <p>Tel: +54 11 5555-5555</p>
        </div>

        <div className="footer-section">
          <h4>Redes</h4>
          <ul className="footer-socials">
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Facebook</a></li>
          </ul>
        </div>
      </div>

      <p className="footer-copy">© {new Date().getFullYear()} Modea Velour — Page has been created for me.</p>
    </footer>
  );
};