import "./Item.css";

export const Item = ({ name, price, description, imageUrl, children }) => {
  //recordamos el uso del children, no es obligatorio que este

  //Si este componente usara children ni botones que generen conflictos,
  // podrian envolver aca con Link (agregando el uso de props "id")
  return (
    <article className="product-item">
      <div className="product-img-container">
        <img src={imageUrl} alt={description} className="product-img" />
      </div>

      <div className="product-info">
        <h2 className="product-title">
          {name}
        </h2>
        <p className="product-descripcion">
          {description}
        </p>
        <p className="product-precio">${price}</p>
        {children}
      </div>
    </article>
  );
};