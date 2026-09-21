import { Link } from "react-router-dom";
import { Item } from "../Item/Item";
import "./ItemList.css";
import { useFavoriteContext } from "../../context/FavoriteContext/useFavoriteContext.js"
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext/useAuthContext.js"

export const ItemList = ({ lista }) => {
  const { favoriteItems, addToFavorite, removeFromFavorite } = useFavoriteContext()

  const { user, loading } = useAuthContext()

  const navigate = useNavigate()

  const handleAddFavorite = (e, item) => {
    e.preventDefault()
    e.stopPropagation()

    if (loading) return <p>Loading...</p>

    if (!user) {
      navigate("/admin")
      return
    }

    const isFavorite = favoriteItems.some((fav) => fav.id === item.id);

    if (isFavorite) {
      removeFromFavorite(item.id)
    } else {
      addToFavorite(item)
    }
  }
  //pasamos el button como children, no es obligatorio

  return (
    <div className="item-list-container">
      {lista.length ? (

        lista.map((prod) => {
          const isFav = favoriteItems.some((fav) => fav.id === prod.id);

          return (
            <Link to={`/detail/${prod.id}`} key={prod.id}>
              <Item {...prod}>
                <button className="favorite-btn" onClick={(e) => handleAddFavorite(e, prod)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    width="30"
                    height="30"
                    className="favorite-icon"
                  >
                    {/* Fill */}
                    <path
                      className={`fill ${isFav ? "fill-active" : ""}`}
                      d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"
                    />

                    {/* Stroke */}
                    <path
                      className="stroke"
                      d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"
                    />
                  </svg>

                </button>
              </Item>
            </Link>
          )
        })
      ) : (
        <p>No hay productos</p>
      )}
    </div>
  );
};