import { useEffect, useState } from "react";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/products";

import "./ItemDetailContainer.css";

export const ItemDetailContainer = () => {
  const [detail, setDetail] = useState({});

  //Desestructuramos el objeto del useParams
  //la clave coincide con el nombre que definimos en Route-> :id
  const { id } = useParams();

  useEffect(() => {
    getProductById(id)
          .then((data) => {setDetail(data);})
          .catch((error) => console.error(error));
  }, [id]);

  return (
    <section className="detail-container">
      {Object.keys(detail).length ? (
        <ItemDetail detail={detail} />
      ) : (
        <p>Cargando...</p>
      )}
    </section>
  );
};