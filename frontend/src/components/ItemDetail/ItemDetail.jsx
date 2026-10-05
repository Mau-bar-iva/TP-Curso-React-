import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext/useCartContext';
import { notify } from '../../utils/toast';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { useFavoriteToggle } from '../../context/FavoriteContext/useFavoriteToggle.js';

const TRUST_ITEMS = [
  { label: 'Envío 24/48hs', icon: '🚚' },
  { label: 'Devolución 30 días', icon: '↩️' },
  { label: 'Pago seguro', icon: '🔒' },
];

const formatPrice = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(value || 0));

const getSwatchColor = (colorName) => {
  const value = String(colorName || '').toLowerCase();

  if (value.includes('black')) return '#1D1B1A';
  if (value.includes('white') || value.includes('ivory')) return '#F2EBE1';
  if (value.includes('beige') || value.includes('sand') || value.includes('tan')) return '#C9A98A';
  if (value.includes('brown') || value.includes('camel')) return '#8F6E52';
  if (value.includes('navy') || value.includes('blue')) return '#2B3C57';
  if (value.includes('olive') || value.includes('green')) return '#6A715A';
  if (value.includes('red') || value.includes('coral')) return '#C96C5A';
  if (value.includes('grey') || value.includes('gray')) return '#A7A39C';
  if (value.includes('pink')) return '#D7A7A2';
  return '#D5C4AF';
};

export const ItemDetail = ({ detail = {} }) => {
  const { addItem } = useCartContext();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(detail.variants?.[0]?.color ?? detail.color ?? null);
  const [selectedSize, setSelectedSize] = useState(detail.variants?.[0]?.sizes?.[0] ?? null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(0);

  const { isFavorite, toggle } = useFavoriteToggle();
  const isFav = isFavorite(detail.id);

  const colors = detail.variants
    ? [...new Set(detail.variants.map((variant) => variant.color).filter(Boolean))]
    : [];

  const sizes = detail.variants
    ? [...new Set(detail.variants.flatMap((variant) => variant.sizes || []))]
    : [];

  const discount =
    detail.oldPrice && Number(detail.oldPrice) > Number(detail.price)
      ? Math.round(100 - (Number(detail.price) / Number(detail.oldPrice)) * 100)
      : null;

  const imageGallery = useMemo(() => {
    const images = [
      detail.imageUrl,
      ...(Array.isArray(detail.gallery) ? detail.gallery : []),
      ...(Array.isArray(detail.variants)
        ? detail.variants.map((variant) => variant.imageUrl).filter(Boolean)
        : []),
    ];

    return [...new Set(images.filter(Boolean))];
  }, [detail]);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (!selectedSize && sizes.length > 0) {
      notify('Seleccioná un talle antes de agregar al carrito', 'error');
      return;
    }

    addItem({
      ...detail,
      quantity,
      color: selectedColor,
      size: selectedSize,
    });
  };

  const accordionItems = [
    {
      title: 'Materiales & Sustentabilidad',
      content:
        'Algodón orgánico GOTS, fibras responsables y tintes naturales que respetan la piel y el medio ambiente.',
    },
    {
      title: 'Calce & Medidas',
      content:
        'Modelo de referencia: 1,80 cm, talle M. La prenda se adapta a un corte relajado y ligeramente holgado.',
    },
    {
      title: 'Envíos & Devoluciones',
      content:
        'Despacho en 24/48hs para CABA y GBA. Cambios y devoluciones sin costo dentro de los 30 días corridos.',
    },
  ];

  /* -------------------------------------------------------------------------- */
  /*                    BREADCRUMBS ADAPTATIVOS PARA DETALLE                    */
  /* -------------------------------------------------------------------------- */
  const breadcrumbs = useMemo(() => {
    const crumbs = [
      { label: 'Inicio', to: '/' },
      { label: 'Catálogo', to: '/category' },
    ];

    if (detail.category) {
      const primaryCat = Array.isArray(detail.category) ? detail.category[0] : detail.category;
      if (primaryCat && primaryCat !== 'clothes' && primaryCat !== 'accessories') {
        crumbs.push({
          label: primaryCat,
          to: `/category?category=${encodeURIComponent(primaryCat)}`,
        });
      }
    }

    if (detail.subCategory) {
      crumbs.push({
        label: detail.subCategory,
        to: `/category?category=${encodeURIComponent(detail.subCategory)}`,
      });
    }

    if (detail.name) {
      crumbs.push({ label: detail.name, to: null });
    }

    return crumbs;
  }, [detail]);

  return (
    <article className="w-full bg-[#F7F4EF] px-4 py-6 sm:px-6 lg:px-10">
      {/* BREADCRUMB EDITORIAL DINÁMICO */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-stone-500"
      >
        {breadcrumbs.map((crumb, idx) => (
          <span key={`${crumb.label}-${idx}`} className="flex items-center gap-2">
            {idx !== 0 && <span className="text-stone-300">/</span>}
            {crumb.to ? (
              <Link to={crumb.to} className="transition hover:text-stone-900">
                {crumb.label}
              </Link>
            ) : (
              <span className="font-medium text-stone-900 line-clamp-1 max-w-[280px] sm:max-w-none">
                {crumb.label}
              </span>
            )}
          </span>
        ))}
      </nav>

      <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        {/* GALERÍA DE IMÁGENES */}
        <div className="space-y-4">
          <div className="h-full relative overflow-hidden rounded-[30px] border border-[#E7E1D6] bg-[#F7F4EF] p-3 shadow-[0_22px_52px_-32px_rgba(34,29,23,0.28)] sm:p-4">
            <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
              {detail.collection && (
                <span className="rounded-full bg-white/90 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-stone-700 backdrop-blur-sm">
                  {detail.collection}
                </span>
              )}
            </div>

            {/* BOTÓN DE FAVORITOS CON GUARD DE AUTENTICACIÓN */}
            <FavoriteButton
              isFavorite={isFav}
              onToggle={() => toggle(detail)}
              size="md"
              className="absolute justify-self-end  z-10"
            />

            <img
              src={imageGallery[selectedImage] || detail.imageUrl}
              alt={detail.name}
              className="aspect-[5/5] w-full rounded-[24px] object-cover transform-gpu"
              loading="lazy"
              decoding="async"
              style={{ backgroundColor: '#F7F4EF' }}
            />
          </div>

          {imageGallery.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {imageGallery.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className={`overflow-hidden rounded-[16px] border transition ${selectedImage === index
                    ? 'border-stone-900 shadow-[0_8px_18px_rgba(34,29,23,0.12)]'
                    : 'border-[#E7E1D6] hover:border-stone-400'
                    }`}
                >
                  <img
                    src={image}
                    alt={`${detail.name} vista ${index + 1}`}
                    className="aspect-square w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* PANEL DE COMPRA (STICKY) */}
        <aside className="lg:sticky lg:top-28">
          <div className="space-y-6 rounded-[30px] border border-[#E7E1D6] bg-white p-5 shadow-[0_20px_40px_-28px_rgba(34,29,23,0.15)] sm:p-6">
            {detail.category && (
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
                {Array.isArray(detail.category) ? detail.category[0] : detail.category}
              </p>
            )}

            <h1 className="font-serif text-3xl font-medium text-stone-900 sm:text-4xl">
              {detail.name}
            </h1>

            {/* SELECTOR DE COLOR */}
            {colors.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium uppercase tracking-[0.14em] text-stone-700">
                    {selectedColor ? `Color: ${selectedColor}` : 'Color'}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => {
                    const isActive = selectedColor === color;

                    return (
                      <button
                        key={color}
                        type="button"
                        aria-label={`Seleccionar color ${color}`}
                        aria-pressed={isActive}
                        onClick={() => setSelectedColor(color)}
                        className={`relative h-9 w-9 rounded-full border border-stone-200 transition ${isActive ? 'ring-2 ring-stone-900 ring-offset-2' : 'hover:scale-105'
                          }`}
                        style={{ backgroundColor: getSwatchColor(color) }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* SELECTOR DE TALLE */}
            {sizes.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium uppercase tracking-[0.14em] text-stone-700">
                    Talle
                  </p>

                  <button
                    type="button"
                    onClick={() => alert('Guía de talles: el modelo viste talle M (1.80m).')}
                    className="text-[10px] uppercase tracking-[0.16em] text-stone-500 underline-offset-4 hover:text-stone-900 hover:underline"
                  >
                    ¿Cuál es mi talle? (Guía)
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => {
                    const isActive = selectedSize === size;

                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        aria-pressed={isActive}
                        className={`min-w-[48px] rounded-full border px-3 py-2 text-sm transition ${isActive
                          ? 'border-stone-900 bg-stone-900 text-white'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                          }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEPPER DE CANTIDAD (INICIA EN 1) */}
            <div className="p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 rounded-full border border-[#E7E1D6] bg-white px-2 py-1.5">
                  <button
                    type="button"
                    aria-label="Disminuir cantidad"
                    onClick={() => handleQuantityChange(-1)}
                    className="flex h-8 w-8 items-center justify-center text-xl text-stone-700 transition hover:text-stone-900"
                  >
                    −
                  </button>

                  <span className="min-w-8 text-center text-sm font-medium text-stone-900">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    aria-label="Aumentar cantidad"
                    onClick={() => handleQuantityChange(1)}
                    className="flex h-8 w-8 items-center justify-center text-xl text-stone-700 transition hover:text-stone-900"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-stone-500">Total</p>
                  <div className="flex items-end gap-3">
                    <p className="font-serif text-4xl font-medium text-stone-900">
                      {formatPrice(detail.price)}
                    </p>

                    {detail.oldPrice && (
                      <p className="text-base text-stone-400 line-through">
                        {formatPrice(detail.oldPrice)}
                      </p>
                    )}

                    {discount && (
                      <span className="rounded-full bg-[#F2E8E2] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#A63D34]">
                        -{discount}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* BOTÓN PRIMARIO DE COMPRA */}
            <button
              type="button"
              onClick={async () => {
                // micro-feedback: show 'Añadido ✓' for 800ms
                handleAddToCart();
                const btn = document.activeElement;
                if (btn && btn instanceof HTMLElement) {
                  btn.classList.add('bg-[#155a40]');
                }
                const labelEl = document.getElementById('add-to-cart-label');
                if (labelEl) labelEl.innerText = 'Añadido ✓';
                setTimeout(() => {
                  if (labelEl) labelEl.innerText = 'Agregar al carrito';
                  if (btn && btn instanceof HTMLElement) {
                    btn.classList.remove('bg-[#155a40]');
                  }
                }, 800);
              }}
              id="add-to-cart"
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#1A1714] px-5 text-sm font-medium uppercase tracking-[0.2em] text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#2c2724]"
            >
              <span id="add-to-cart-label">Agregar al carrito</span>
            </button>
          </div>
        </aside>
      </div>

      {/* SELLOS DE CONFIANZA */}
      <div className="mt-10 grid gap-3 md:grid-cols-3">
        {TRUST_ITEMS.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-center gap-2 rounded-full border border-[#E7E1D6] bg-white px-4 py-3 text-sm text-stone-700"
          >
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* ACORDEONES INFORMATIVOS */}
      <div className="mt-10 overflow-hidden rounded-[24px] border border-[#E7E1D6] bg-white">
        {accordionItems.map((item, index) => {
          const isOpen = openAccordion === index;

          return (
            <div key={item.title} className="border-b border-[#E7E1D6] last:border-b-0">
              <button
                type="button"
                onClick={() => setOpenAccordion(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium uppercase tracking-[0.14em] text-stone-700"
              >
                <span>{item.title}</span>
                <span className="text-lg text-stone-500">{isOpen ? '−' : '+'}</span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-sm leading-7 text-stone-600">
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </article>
  );
};