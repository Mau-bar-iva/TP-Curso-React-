import { useState } from "react";
import { useCartContext } from "../../context/CartContext/useCartContext";
import { Count } from "../Count/Count";
import "./ItemDetail.css";

const TRUST_ITEMS = [
  { label: "Envío 24/48hs", icon: "🚚" },
  { label: "Devolución 30 días", icon: "↩️" },
  { label: "Pago seguro", icon: "🔒" },
];

export const ItemDetail = ({ detail }) => {
  const { addItem } = useCartContext();

  const [selectedColor, setSelectedColor] = useState(
    detail.variants?.[0]?.color ?? detail.color ?? null
  );
  const [selectedSize, setSelectedSize] = useState(
    detail.variants?.[0]?.sizes?.[0] ?? null
  );

  const colors = detail.variants
    ? [...new Set(detail.variants.map((v) => v.color).filter(Boolean))]
    : [];

  const sizes = detail.variants
    ? [...new Set(detail.variants.flatMap((v) => v.sizes || []))]
    : [];

  const discount =
    detail.oldPrice && detail.oldPrice > detail.price
      ? Math.round(100 - (detail.price / detail.oldPrice) * 100)
      : null;

  const handleAdd = (quantity) => {
    addItem({ ...detail, quantity, color: selectedColor, size: selectedSize });
  };

  return (
    <article className="detail-product">
      <nav className="detail-breadcrumb" aria-label="breadcrumb">
        <span>Inicio</span>
        <span className="detail-breadcrumb-sep">/</span>
        <span className="detail-breadcrumb-current">
          {Array.isArray(detail.category) ? detail.category[0] : detail.category}
        </span>
      </nav>

      <div className="detail-layout">
        <div className="product-img-container">
          {discount && <span className="product-badge">-{discount}%</span>}
          <img src={detail.imageUrl} alt={detail.description} className="product-img" />
        </div>

        <div className="product-info">
          {detail.category && (
            <p className="product-eyebrow">
              {Array.isArray(detail.category) ? detail.category[0] : detail.category}
            </p>
          )}

          <h1 className="product-title">{detail.name}</h1>

          <p className="detail-descripcion">{detail.description}</p>

          {colors.length > 0 ? (
            <div className="detail-option-group">
              <p className="detail-option-label">
                Color{selectedColor ? `: ${selectedColor}` : ""}
              </p>
              <ul className="detail-swatches">
                {colors.map((c) => (
                  <li key={c}>
                    <button
                      type="button"
                      className={`detail-swatch ${selectedColor === c ? "is-selected" : ""}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setSelectedColor(c)}
                      aria-label={c}
                      aria-pressed={selectedColor === c}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            detail.color && (
              <p className="detail-option-label">Color: {detail.color}</p>
            )
          )}

          {sizes.length > 0 && (
            <div className="detail-option-group">
              <p className="detail-option-label">Talle</p>
              <ul className="detail-sizes">
                {sizes.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      className={`detail-size ${selectedSize === s ? "is-selected" : ""}`}
                      onClick={() => setSelectedSize(s)}
                      aria-pressed={selectedSize === s}
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="detail-purchase-box">
            <div className="detail-purchase-price-row">
              <p className="product-precio">${detail.price}</p>
              {discount && <p className="product-precio-old">${detail.oldPrice}</p>}
            </div>

            <p className="detail-stock">
              <span className="detail-stock-dot" /> En stock
            </p>

            <div className="product-button-container">
              <Count btnText={"Agregar al carrito"} onConfirm={handleAdd} />
            </div>
          </div>

          <ul className="detail-trust">
            {TRUST_ITEMS.map((t) => (
              <li key={t.label}>
                <span aria-hidden="true">{t.icon}</span>
                {t.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
};