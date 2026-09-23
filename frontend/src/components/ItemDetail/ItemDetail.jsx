import { useMemo, useState } from 'react';
import { useCartContext } from '../../context/CartContext/useCartContext';
import { notify } from '../../utils/toast';
import { useFavoriteContext } from '../../context/FavoriteContext/useFavoriteContext';

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

export const ItemDetail = ({ detail }) => {
  const { addItem } = useCartContext();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(detail.variants?.[0]?.color ?? detail.color ?? null);
  const [selectedSize, setSelectedSize] = useState(detail.variants?.[0]?.sizes?.[0] ?? null);
  const [selectedImage, setSelectedImage] = useState(0);
  const { isFavorite, toggleFavorite } = useFavoriteContext();
  const isFav = isFavorite(detail.id);
  const [openAccordion, setOpenAccordion] = useState(0);

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
        ? detail.variants
          .map((variant) => variant.imageUrl)
          .filter(Boolean)
        : []),
    ];

    return [...new Set(images.filter(Boolean))];
  }, [detail]);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      notify('Seleccioná un talle antes de agregar al carrito', 'error');
      return;
    }

    addItem({
      ...detail,
      quantity,
      color: selectedColor,
      size: selectedSize,
    });

    notify(`${detail.name} añadido al carrito`, 'success');
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

  return (
    <article className="w-full bg-[#F7F4EF] px-4 py-6 sm:px-6 lg:px-10">
      <nav
        aria-label="breadcrumb"
        className="mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-stone-500"
      >
        <span>Inicio</span>
        <span>/</span>
        <span className="text-stone-900">
          {Array.isArray(detail.category) ? detail.category[0] : detail.category}
        </span>
      </nav>

      <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-[30px] border border-[#E7E1D6] bg-[#F7F4EF] p-3 shadow-[0_22px_52px_-32px_rgba(34,29,23,0.28)] sm:p-4">
            <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
              {detail.collection && (
                <span className="rounded-full bg-white/90 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-stone-700 backdrop-blur-sm">
                  {detail.collection}
                </span>
              )}
            </div>

            <button
              type="button"
              aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
              onClick={() => toggleFavorite(detail)}
              className={`absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#E7E1D6] bg-white/90 shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95 ${isFav ? "text-[#A63D34] border-[#A63D34]/30" : "text-stone-700"
                }`}
            >
              <svg
                viewBox="0 0 24 24"
                className={`h-5 w-5 transition-all ${isFav ? "fill-[#A63D34] stroke-[#A63D34]" : "fill-none stroke-current"
                  }`}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20.25s-7.5-4.35-9.5-8.64C1.3 9.39 2.95 5.25 6.9 5.25c2.11 0 3.34 1.02 4.1 2.05.76-1.03 2-2.05 4.1-2.05 3.95 0 5.6 4.14 4.4 6.36-2 4.29-9.5 8.64-9.5 8.64Z" />
              </svg>
            </button>

            <img
              src={imageGallery[selectedImage] || detail.imageUrl}
              alt={detail.name}
              className="aspect-[4/5] w-full rounded-[24px] object-cover"
            />
          </div>

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
        </div>

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

            {sizes.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium uppercase tracking-[0.14em] text-stone-700">
                    Talle
                  </p>

                  <button
                    type="button"
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

            <div className="rounded-[22px] border border-[#E7E1D6] bg-[#F7F4EF] p-3">
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
                  <p className="font-serif text-2xl text-stone-900">
                    {formatPrice(Number(detail.price) * quantity)}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#1A1714] px-5 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#2c2724]"
            >
              <span>Agregar al carrito</span>
            </button>

            <div className="flex items-center gap-2 text-sm text-emerald-700">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
              <span>En stock · Listo para despacho en 24hs</span>
            </div>
          </div>
        </aside>
      </div>

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