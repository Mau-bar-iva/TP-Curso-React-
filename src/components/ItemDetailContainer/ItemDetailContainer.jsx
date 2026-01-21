import { useEffect, useState } from "react";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { Item } from "../Item/Item.jsx";
import { ItemListContainer } from "../ItemListContainer/ItemListContainer.jsx";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/products";
import CarouselItems from "../CarouselItems/CarouselItems.jsx";
import "./ItemDetailContainer.css";

export const ItemDetailContainer = () => {
  const [detail, setDetail] = useState({});

  const { id } = useParams();

  useEffect(() => {
    getProductById(id)
      .then((data) => { setDetail(data) })
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <section className="detail-container">
      {Object.keys(detail).length ? (
        <>
          <ItemDetail detail={detail} />

          {detail.category && (
            <div className="suggest-container">
              <h4 className="suggest-title">Suggest for you</h4>
              <CarouselItems>
                <ItemListContainer category={detail.category[0]} />
              </CarouselItems>
            </div>
          )}
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </section>
  );
};