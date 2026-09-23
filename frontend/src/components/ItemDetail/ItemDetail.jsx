import { useState } from 'react';
import { useCartContext } from '../../context/CartContext/useCartContext';
import { Count } from '../Count/Count';

const TRUST_ITEMS = [
  { label: 'Envío 24/48hs', icon: '🚚' },
  { label: 'Devolución 30 días', icon: '↩️' },
  { label: 'Pago seguro', icon: '🔒' },
];

export const ItemDetail = ({ detail }) => {
  const { addItem } = useCartContext();

  const [selectedColor, setSelectedColor] = useState(detail.variants?.[0]?.color ?? detail.color ?? null);
  const [selectedSize, setSelectedSize] = useState(detail.variants?.[0]?.sizes?.[0] ?? null);

  const colors = detail.variants ? [...new Set(detail.variants.map((v) => v.color).filter(Boolean))] : [];
  const sizes = detail.variants ? [...new Set(detail.variants.flatMap((v) => v.sizes || []))] : [];

  const discount =
    detail.oldPrice && detail.oldPrice > detail.price
      ? Math.round(100 - (detail.price / detail.oldPrice) * 100)
      : null;

  const handleAdd = (quantity) => {
    addItem({ ...detail, quantity, color: selectedColor, size: selectedSize });
  };

  return (
    <article className="w-full bg-white px-4 py-6 sm:px-6 lg:px-10">
      <nav aria-label="breadcrumb" className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-stone-500">
        <span>Inicio</span>
        <span>/</span>
        <span className="text-stone-900">
          {Array.isArray(detail.category) ? detail.category[0] : detail.category}
        </span>
      </nav>

      <div className="grid items-start gap-8 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden border border-stone-200 bg-[#f7f4ef] p-8 shadow-[0_20px_40px_-28px_rgba(34,29,23,0.25)]">
          {discount && (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-[#a63d34] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
              -{discount}%
            </span>
          )}
          <img src={detail.imageUrl} alt={detail.description} className="h-full w-full object-contain" />
        </div>

        <div className="flex flex-col gap-4">
          {detail.category && (
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
              {Array.isArray(detail.category) ? detail.category[0] : detail.category}
            </p>
          )}

          <h1 className="font-serif text-4xl font-medium text-stone-900 md:text-5xl">{detail.name}</h1>
          <p className="text-base leading-7 text-stone-700">{detail.description}</p>

          {colors.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm font-medium uppercase tracking-[0.14em] text-stone-700">
                Color{selectedColor ? `: ${selectedColor}` : ''}
              </p>
              <ul className="flex flex-wrap gap-3">
                {colors.map((c) => (
                  <li key={c}>
                    <button
                      type="button"
                      className={`h-8 w-8 rounded-full border transition ${selectedColor === c ? 'ring-2 ring-stone-900 ring-offset-2' : 'border-stone-200'}`}
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
            detail.color && <p className="text-sm font-medium uppercase tracking-[0.14em] text-stone-700">Color: {detail.color}</p>
          )}

          {sizes.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium uppercase tracking-[0.14em] text-stone-700">Talle</p>
              <ul className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      className={`min-w-[44px] rounded-full border px-3 py-2 text-sm transition ${selectedSize === s ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                        }`}
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

          <div className="mt-2 space-y-4 rounded-[24px] border border-stone-200 bg-[#f7f4ef] p-5">
            <div className="flex items-baseline gap-3">
              <p className="font-serif text-4xl font-medium text-stone-900">${detail.price}</p>
              {discount && <p className="text-base text-stone-500 line-through">${detail.oldPrice}</p>}
            </div>

            <p className="flex items-center gap-2 text-sm font-medium text-emerald-700">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" /> En stock
            </p>

            <div className="w-full">
              <Count btnText="Agregar al carrito" onConfirm={handleAdd} />
            </div>
          </div>

          <ul className="grid gap-2 text-sm text-stone-700 md:grid-cols-3">
            {TRUST_ITEMS.map((t) => (
              <li key={t.label} className="flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-2">
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