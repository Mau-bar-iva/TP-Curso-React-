import { useCartContext } from "../../context/CartContext/useCartContext";
import { Count } from "../Count/Count";
import { Item } from "../Item/Item";
import "./ItemDetail.css"

export const ItemDetail = ({ detail }) => {
  const { addItem } = useCartContext();

  const handleAdd = (quantity) => {
    addItem({ ...detail, quantity });
  };

  return (
    <article className="detail-product">
      <div className="product-img-container">
        <img src={detail.imageUrl} alt={detail.description} className="product-img" />
      </div>

      <div className="product-info">
        <p>{detail.category}</p>

        <h2 className="product-title">
          {detail.name}
        </h2>

        <p className="product-descripcion">
          {detail.description}
        </p>

        <div>
          <p>Color: {detail.color}</p>
        </div>

        <p className="product-precio">${detail.price}</p>

        <div className="product-button-container">
          <Count btnText={"Agregar al carrito"} onConfirm={handleAdd} />
        </div>
      </div>
    </article>

  );
};