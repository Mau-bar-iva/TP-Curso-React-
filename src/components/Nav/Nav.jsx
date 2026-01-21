import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartContext } from "../../context/CartContext/useCartContext";
import "./Nav.css";
import carritoIcon from "../../assets/carrito.svg";
import favoriteIcon from "../../assets/favorite.svg";
import userIcon from "../../assets/user.svg"
import searchIcon from "../../assets/search.svg";
import closeIcon from "../../assets/close.svg";
import ResultSearch from "../ResultSearch/ResultSearch.jsx"

export const Nav = () => {
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
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
        <li className="nav-list-item">
          <Link to={"/category?category=men"}>Men</Link>
        </li>
        <li className="nav-list-item">
          <Link to={"/category?category=women"}>Women</Link>
        </li>
        <li className="nav-list-item">
          <Link to={"/category?category=kids"}>Kids</Link>
        </li>
        <li className="nav-list-searchbar ">
          <label htmlFor="searchbar" className="searchbar-container">
            <input type="text" id="searchbar" placeholder="Search product..." className="searchbar" value={search} onChange={handleSearch} />
            {search === "" ? (<img src={searchIcon} alt="" />) : (<img src={closeIcon} alt="" onClick={() => setSearch("")} />)}
          </label>
          <div className="searchbar-result-container">
            <ResultSearch search={debouncedSearch} />
          </div>

        </li>
        <li className="nav-list-item">
          <Link to={"/admin"}>
            <img src={userIcon} alt="" className="list-icon" />
          </Link>
        </li>
        <li className="nav-list-item">
          <Link to={"/favorite"}>
            <img src={favoriteIcon} alt="" className="list-icon" />
          </Link>
        </li>
        <li className="nav-list-item">
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