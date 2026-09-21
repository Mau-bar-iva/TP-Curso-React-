import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartContext } from "../../context/CartContext/useCartContext";
import "./Nav.css";
import carritoIcon from "../../assets/carrito.svg";
import favoriteIcon from "../../assets/favorite.svg";
import userIcon from "../../assets/user.svg"
import searchIcon from "../../assets/search.svg";
import closeIcon from "../../assets/close.svg";
import MenuIcon from "../../assets/menu.svg";
import ResultSearch from "../ResultSearch/ResultSearch.jsx"


export const Nav = () => {
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [openMenu, setOpenMenu] = useState(false)
  const { getTotalItems } = useCartContext();

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)

    return () => clearInterval(timer)
  })

  //Dejamos los Link preparados para cuando hagamos filtrado por categoria
  //Por ahora, quedan de vista, pero sirven al tocar para escribir la ruta
  //en la barra de busqueda
  return (
    <nav className="nav">

      <ul className="nav-list-container">

        {/* Menu visible en mobile */}
        <li className="nav-list-item nav-list-mobile menu-container">
          <button className={`menu-btn ${openMenu ? "menu-darkmode" : ""}`} onClick={() => setOpenMenu(!openMenu)}>
            <img src={MenuIcon} alt="menu-icon" className="list-icon" />
          </button>
        </li>

        {/* Nav en desktop */}
        <div className={`nav-list-desktop-container ${openMenu ? "open" : ""}`}>
          <li className="nav-list-item nav-list-desktop">
            <Link to={"/category?category=men"}>Men</Link>
          </li>

          <li className="nav-list-item nav-list-desktop">
            <Link to={"/category?category=women"}>Women</Link>
          </li>

          <li className="nav-list-item nav-list-desktop">
            <Link to={"/category?category=kids"}>Kids</Link>
          </li>

          <li className="nav-list-searchbar  nav-list-desktop">
            <label htmlFor="searchbar" className="searchbar-container">
              <input type="text" id="searchbar" placeholder="Search product..." className="searchbar" value={search} onChange={handleSearch} />
              {search === "" ? (<img src={searchIcon} alt="" />) : (<img src={closeIcon} alt="" onClick={() => setSearch("")} />)}
            </label>
            <div className="searchbar-result-container">
              <ResultSearch search={debouncedSearch} />
            </div>
          </li>
        </div>

        <li className="nav-list-item nav-list-mobile user-icon-container">
          <Link to={"/admin"}>
            <img src={userIcon} alt="" className="list-icon" />
          </Link>
        </li>
        <li className="nav-list-item nav-list-mobile favorite-icon-container">
          <Link to={"/favorite"}>
            <img src={favoriteIcon} alt="" className="list-icon" />
          </Link>
        </li>
        <li className="nav-list-item nav-list-mobile carrito-icon-container">
          <Link to={"/carrito"}>
            <img src={carritoIcon} alt="" className="list-icon" />
          </Link>

          {getTotalItems() > 0 && (
            <span className="in-cart">{getTotalItems()}</span>
          )}

        </li>

      </ul>
    </nav>
  );
};