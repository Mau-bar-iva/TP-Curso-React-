import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartContext } from "../../context/CartContext/useCartContext";
import carritoIcon from "../../assets/carrito.svg";
import favoriteIcon from "../../assets/favorite.svg";
import userIcon from "../../assets/user.svg";
import searchIcon from "../../assets/search.svg";
import closeIcon from "../../assets/close.svg";
import MenuIcon from "../../assets/menu.svg";
import ResultSearch from "../ResultSearch/ResultSearch.jsx";
import { useAuthContext } from "../../context/AuthContext/useAuthContext";
import "./Nav.css";

export const Nav = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const { getTotalItems } = useCartContext();
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleSearch = (e) => setSearch(e.target.value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <nav className="w-full">
      <ul className="m-0 flex list-none items-center justify-end gap-3 p-0 lg:gap-4">
        <li className="flex md:hidden">
          <button
            type="button"
            aria-label="Abrir menú"
            className={`flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white transition ${openMenu ? "bg-stone-900 text-white" : "text-stone-900"}`}
            onClick={() => setOpenMenu(!openMenu)}
          >
            <img src={MenuIcon} alt="menu-icon" className="h-5 w-5" />
          </button>
        </li>

        <div className={`${openMenu ? "translate-x-0" : "-translate-x-full md:translate-x-0"} fixed left-0 top-[90px] z-40 flex h-[calc(100vh-90px)] w-[70%] flex-col gap-6 bg-[#121212] p-6 text-white transition-transform duration-300 md:static md:flex md:h-auto md:w-auto md:flex-row md:items-center md:gap-3 md:bg-transparent md:p-0 md:text-stone-900`}>
          <li className="list-none nav-list-item md:flex">
            <Link to="/category?category=men" className="relative px-2 py-2 text-sm font-medium uppercase tracking-[0.18em] text-current transition-all duration-200 hover:text-stone-600 hover:opacity-100 md:text-[0.7rem]">
              Men
            </Link>
          </li>
          <li className="list-none nav-list-item md:flex">
            <Link to="/category?category=women" className="relative px-2 py-2 text-sm font-medium uppercase tracking-[0.18em] text-current transition-all duration-200 hover:text-stone-600 hover:opacity-100 md:text-[0.7rem]">
              Women
            </Link>
          </li>
          <li className="list-none nav-list-item md:flex">
            <Link to="/category?category=kids" className="relative px-2 py-2 text-sm font-medium uppercase tracking-[0.18em] text-current transition-all duration-200 hover:text-stone-600 hover:opacity-100 md:text-[0.7rem]">
              Kids
            </Link>
          </li>

          <li className="list-none md:flex">
            <div className="relative">
              <label htmlFor="searchbar" className="flex items-center gap-2 rounded-full border border-stone-300 bg-white px-3 py-2 shadow-sm md:min-w-[220px]">
                <input
                  type="text"
                  id="searchbar"
                  placeholder="Search product..."
                  value={search}
                  onChange={handleSearch}
                  className="w-full border-none bg-transparent text-sm text-stone-800 outline-none placeholder:text-stone-400"
                />
                {search === "" ? (
                  <img src={searchIcon} alt="" className="h-4 w-4 opacity-70" />
                ) : (
                  <button type="button" className="flex items-center" onClick={() => setSearch("")}>
                    <img src={closeIcon} alt="" className="h-4 w-4 opacity-70" />
                  </button>
                )}
              </label>
              <div className="absolute left-1/2 top-full z-40 mt-2 -translate-x-1/2">
                <ResultSearch search={debouncedSearch} />
              </div>
            </div>
          </li>

          {user && (
            <li className="list-none md:flex">
              <button
                type="button"
                className="rounded-full border border-stone-300 bg-stone-100 px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-stone-700 transition hover:border-stone-400 hover:bg-stone-200"
                onClick={async () => {
                  await logout();
                  navigate("/", { replace: true });
                }}
              >
                Cerrar sesión
              </button>
            </li>
          )}
        </div>

        <li className="flex list-none items-center">
          <Link to="/admin" className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white transition-all duration-200 hover:border-stone-400 hover:bg-stone-100 hover:shadow-sm">
            <img src={userIcon} alt="" className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
          </Link>
        </li>
        <li className="flex list-none items-center">
          <Link to="/favorite" className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white transition-all duration-200 hover:border-stone-400 hover:bg-stone-100 hover:shadow-sm">
            <img src={favoriteIcon} alt="" className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
          </Link>
        </li>
        <li className="relative flex list-none items-center">
          <Link to="/carrito" className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white transition-all duration-200 hover:border-stone-400 hover:bg-stone-100 hover:shadow-sm">
            <img src={carritoIcon} alt="" className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
          </Link>
          {getTotalItems() > 0 && (
            <span className="absolute -right-2 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d7c8b6] px-1 text-[10px] font-semibold text-stone-900">
              {getTotalItems()}
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
};