import "./Item.css";

export const Item = ({
  name,
  price,
  oldPrice,
  description,
  imageUrl,
  category,
  variants,
  isNew,
  children,
}) => {
  const colors = variants
    ? [...new Set(variants.map((v) => v.color).filter(Boolean))]
    : [];

  const discount =
    oldPrice && oldPrice > price
      ? Math.round(100 - (price / oldPrice) * 100)
      : null;

  return (
    <article className="product-item">
      <div className="product-img-container">
        {(isNew || discount) && (
          <span
            className={`product-badge ${discount ? "product-badge-sale" : "product-badge-new"}`}
          >
            {discount ? `-${discount}%` : "Nuevo"}
          </span>
        )}
        <img src={imageUrl} alt={description} className="product-img" loading="lazy" />
        {children}
      </div>

      <div className="product-info">
        {category && (
          <p className="product-eyebrow">
            {Array.isArray(category) ? category[0] : category}
          </p>
        )}

        <h2 className="product-title">{name}</h2>

        {colors.length > 0 && (
          <ul className="product-swatches" aria-label="Colores disponibles">
            {colors.slice(0, 5).map((c) => (
              <li key={c} className="product-swatch" style={{ backgroundColor: c }} title={c} />
            ))}
            {colors.length > 5 && (
              <li className="product-swatch-more">+{colors.length - 5}</li>
            )}
          </ul>
        )}

        <div className="product-price-row">
          <p className="product-precio">${price}</p>
          {discount && <p className="product-precio-old">${oldPrice}</p>}
        </div>
      </div>
    </article>
  );
};