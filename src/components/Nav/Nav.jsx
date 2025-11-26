import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext/useCartContext";
import "./Nav.css";
import carritoIcon from "../../assets/carrito.svg";

export const Nav = () => {
  const { getTotalItems } = useCartContext();

  //Dejamos los Link preparados para cuando hagamos filtrado por categoria
  //Por ahora, quedan de vista, pero sirven al tocar para escribir la ruta
  //en la barra de busqueda
  return (
    <nav className="nav">
      <ul className="nav-list-container">
        <li className="nav-list-item">
          <Link to={"/"}>Home</Link>
        </li>
        <li className="nav-list-item">
          <Link to={"/category/clothes"}>Clothes</Link>
        </li>
        <li className="nav-list-item">
          <Link to={"/category/accessories"}>Accessories</Link>
        </li>
        <li className="nav-list-item">
          <Link to={"/carrito"}>
            <img src={carritoIcon} alt=""/>
          </Link>
          
          {getTotalItems() > 0 && (
            <span className="in-cart">{getTotalItems()}</span>
          )}
        </li>
      </ul>
    </nav>
  );
};