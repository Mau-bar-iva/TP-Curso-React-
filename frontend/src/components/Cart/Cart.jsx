import { Link, useNavigate } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext/useCartContext';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const IconBag = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="M6 8h12l-1 11H7L6 8Z" />
    <path d="M9 8a3 3 0 1 1 6 0" />
  </svg>
);

const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <rect x="5" y="10" width="14" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 1 1 8 0v3" />
  </svg>
);

const IconTrash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v5" />
    <path d="M14 11v5" />
  </svg>
);

const IconTrashSimple = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M19 6l-1 14H6L5 6" />
  </svg>
);

const IconChevron = ({ direction = 'right' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`h-4 w-4 ${direction === 'left' ? 'rotate-180' : ''}`}
  >
    <path d="M5 12h14" />
    <path d="m13 5 7 7-7 7" />
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M12 3 5 6v6c0 4.2 2.7 7.9 7 9 4.3-1.1 7-4.8 7-9V6l-7-3Z" />
    <path d="m9.5 12 1.7 1.7 3.3-4" />
  </svg>
);

const IconTruck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M3 7h11v8H3z" />
    <path d="M14 10h3l3 3v2h-6z" />
    <circle cx="8" cy="17" r="1.6" />
    <circle cx="18" cy="17" r="1.6" />
  </svg>
);

const IconReturn = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M7 7h10a4 4 0 0 1 0 8H8" />
    <path d="m11 3 4 4-4 4" />
  </svg>
);

export const Cart = () => {
  const navigate = useNavigate();
  const { cart, clearCart, deleteItem, total, checkout, updateQuantity } = useCartContext();
  const freeShippingThreshold = 150;
  const subtotal = Number(total() || 0);
  const freeShippingAchieved = subtotal >= freeShippingThreshold;
  const shippingCost = freeShippingAchieved ? 0 : 18;
  const remainingToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const catalogSavings = cart.reduce((acc, item) => {
    const oldPrice = Number(item.oldPrice || 0);
    const currentPrice = Number(item.price || 0);

    if (oldPrice > currentPrice) {
      return acc + (oldPrice - currentPrice) * Number(item.quantity || 1);
    }

    return acc;
  }, 0);

  const finalTotal = subtotal + shippingCost - catalogSavings;

  const getDiscount = (product) => {
    if (!product.oldPrice || Number(product.oldPrice) <= Number(product.price)) return null;
    return Math.round(100 - (Number(product.price) / Number(product.oldPrice)) * 100);
  };

  const handleQuantityChange = (productId, delta) => {
    const product = cart.find((item) => item.id === productId);
    if (!product) return;

    const nextQuantity = product.quantity + delta;
    if (nextQuantity <= 0) {
      deleteItem({ preventDefault: () => { }, stopPropagation: () => { } }, productId);
      return;
    }

    updateQuantity(productId, nextQuantity);
  };

  if (!cart.length) {
    return (
      <section className="mx-auto w-full max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-[#E7E1D6] bg-[#F7F4EF] px-6 py-10 text-center shadow-[0_20px_60px_rgba(34,29,23,0.04)] sm:px-10 lg:px-14">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#E7E1D6] bg-white text-[#221D17]">
            <IconBag />
          </div>

          <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">Your bag</p>
          <h2 className="mt-3 font-serif text-4xl text-[#221D17] sm:text-5xl">Your cart is empty.</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-600">
            Explore our latest wardrobe edit and discover timeless staples for every season.
          </p>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1A1714] px-6 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition hover:bg-[#2a2522]"
          >
            Discover collection
            <IconChevron />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">Shopping bag</p>
          <h2 className="mt-2 font-serif text-4xl text-[#221D17]">Your essentials</h2>
        </div>

        <button
          type="button"
          onClick={() => {
            if (window.confirm('Empty your bag? This action will remove all items from your cart.')) {
              clearCart();
            }
          }}
          className="inline-flex items-center gap-2 rounded-full border border-[#E7E1D6] bg-white px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-stone-600 transition hover:border-stone-300 hover:text-[#221D17]"
        >
          <IconTrashSimple />
          Clear cart
        </button>
      </div>

      <div className="mb-6 rounded-[26px] border border-[#E7E1D6] bg-[#F7F4EF] px-4 py-4 shadow-[0_10px_30px_rgba(34,29,23,0.03)] sm:px-5">
        <div className="flex items-center justify-between gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-stone-600">
          <span>{freeShippingAchieved ? 'Free shipping unlocked' : 'Free shipping progress'}</span>
          <span>{freeShippingAchieved ? 'Complete' : `${currency.format(remainingToFreeShipping)} left`}</span>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E7E1D6]">
          <div
            className="h-full rounded-full bg-[#221D17] transition-all duration-300"
            style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
          />
        </div>

        <p className="mt-3 text-sm text-stone-700">
          {freeShippingAchieved
            ? 'Free shipping unlocked!'
            : `Add ${currency.format(remainingToFreeShipping)} more to get free shipping.`}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div className="space-y-4">
          {cart.map((product) => {
            const discount = getDiscount(product);
            const itemTotal = Number(product.price || 0) * Number(product.quantity || 1);
            const variantColor = product?.variants?.[0]?.color || 'Ivory';
            const variantSize = product?.variants?.[0]?.sizes?.[0] || 'M';

            return (
              <article
                key={product.id}
                className="flex flex-col gap-4 rounded-[28px] border border-[#E7E1D6] bg-[#F8F5F2] p-4 shadow-[0_14px_28px_rgba(34,29,23,0.03)] sm:flex-row sm:items-center"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-[22px] border border-[#E7E1D6] bg-white sm:w-32">
                  {discount && (
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-[#A63D34] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-white">
                      -{discount}%
                    </span>
                  )}

                  <img
                    src={product.imageUrl || '/assets/logo.png'}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone-500">
                      {Array.isArray(product.category) ? product.category[0] : product.category || 'Collection'}
                    </p>

                    <Link to={`/detail/${product.id}`} className="group inline-block">
                      <h3 className="mt-2 font-serif text-2xl text-[#221D17] transition group-hover:text-stone-600">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-stone-600">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full border border-stone-300"
                          style={{ backgroundColor: variantColor?.toLowerCase() || '#d6c7b2' }}
                        />
                        {variantColor}
                      </span>
                      <span className="text-stone-300">•</span>
                      <span>Size {variantSize}</span>
                    </div>

                    <div className="mt-4 flex items-center gap-4 sm:flex-wrap">
                      <div className="flex min-h-[44px] items-center rounded-full border border-[#E7E1D6] bg-white px-2 py-1.5">
                        <button
                          type="button"
                          aria-label={`Reduce quantity of ${product.name}`}
                          onClick={() => handleQuantityChange(product.id, -1)}
                          className="flex h-9 w-9 items-center justify-center text-lg text-stone-700 transition hover:text-[#221D17]"
                        >
                          −
                        </button>
                        <span className="min-w-8 text-center text-sm font-medium text-[#221D17]">{product.quantity}</span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${product.name}`}
                          onClick={() => handleQuantityChange(product.id, 1)}
                          className="flex h-9 w-9 items-center justify-center text-lg text-stone-700 transition hover:text-[#221D17]"
                        >
                          +
                        </button>
                      </div>

                      {discount && (
                        <div className="flex items-center gap-2 text-sm text-stone-500">
                          <span className="font-medium text-[#A63D34]">-{discount}%</span>
                          <span className="line-through">{currency.format(Number(product.oldPrice || product.price || 0))}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <div className="text-right">
                      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone-500">Total</p>
                      <p className="mt-1 font-serif text-3xl text-[#221D17] tabular-nums">{currency.format(itemTotal)}</p>
                    </div>

                    <button
                      type="button"
                      aria-label={`Remove ${product.name} from cart`}
                      onClick={(event) => deleteItem(event, product.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-[#E7E1D6] bg-white px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-stone-600 transition hover:border-stone-300 hover:text-[#221D17]"
                    >
                      <IconTrash />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <aside className="lg:sticky lg:top-28">
          <div className="rounded-[28px] border border-[#E7E1D6] bg-[#F7F4EF] p-5 shadow-[0_25px_55px_rgba(34,29,23,0.04)] sm:p-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">Order summary</p>
            <div className="mt-5 space-y-4 text-sm text-stone-700">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#221D17] tabular-nums">{currency.format(subtotal)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="font-medium text-[#221D17] tabular-nums">
                  {freeShippingAchieved ? 'Free' : currency.format(shippingCost)}
                </span>
              </div>

              {catalogSavings > 0 && (
                <div className="flex items-center justify-between rounded-full border border-[#D7E5D8] bg-[#EEF7F0] px-3 py-2 text-[#21543A]">
                  <span className="text-[10px] font-medium uppercase tracking-[0.16em]">Savings</span>
                  <span className="font-medium tabular-nums">-{currency.format(catalogSavings)}</span>
                </div>
              )}

              <div className="border-t border-[#E7E1D6] pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm uppercase tracking-[0.18em] text-stone-500">Total</span>
                  <span className="font-serif text-4xl text-[#221D17] tabular-nums">
                    {currency.format(finalTotal)}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={checkout}
              className="mt-6 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#1A1714] px-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#2d2825]"
            >
              <IconLock className="h-5 w-5" />
              Proceed to checkout
            </button>

            <div className="mt-5 space-y-3 border-t border-[#E7E1D6] pt-5 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <IconShield />
                <span>SSL encrypted transaction</span>
              </div>
              <div className="flex items-center gap-2">
                <IconTruck />
                <span>Tracked delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <IconReturn />
                <span>30-day exchange policy</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};