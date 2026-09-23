import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext/useCartContext';
import { Item } from '../Item/Item';

export const Cart = () => {
  const { cart, clearCart, deleteItem, total, checkout, getTotalItems } = useCartContext();

  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 lg:px-10">
      <h2 className="mb-6 font-serif text-4xl font-medium text-stone-900">Shopping cart</h2>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="grid gap-6">
          {cart.length ? (
            cart.map((prod) => (
              <Link to={`/detail/${prod.id}`} key={prod.id} className="block">
                <Item key={prod.id} {...prod}>
                  <div className="flex flex-col gap-2 text-sm text-stone-700">
                    <span>Quantity: {prod.quantity}</span>
                    <button
                      type="button"
                      className="mt-2 w-fit rounded-full border border-stone-300 bg-white px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-stone-700 transition hover:border-stone-500"
                      onClick={(e) => deleteItem(e, prod.id)}
                    >
                      Remove from cart
                    </button>
                  </div>
                </Item>
              </Link>
            ))
          ) : (
            <p className="rounded-[24px] border border-dashed border-stone-300 bg-white p-8 text-stone-600">Your cart is empty</p>
          )}
        </div>

        <aside className="rounded-[28px] border border-stone-200 bg-[#f7f4ef] p-6 shadow-[0_22px_45px_rgba(33,29,23,0.06)]">
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">Summary</p>
            <div className="text-xl font-semibold text-stone-900">
              Total to pay ({getTotalItems()} products): ${total()}
            </div>

            <div className="grid gap-3">
              <button type="button" className="rounded-full bg-stone-900 px-4 py-3 text-sm font-medium uppercase tracking-[0.18em] text-white transition hover:bg-stone-700" onClick={clearCart}>
                Clear cart
              </button>
              <button type="button" className="rounded-full border border-stone-300 bg-white px-4 py-3 text-sm font-medium uppercase tracking-[0.18em] text-stone-800 transition hover:border-stone-400" onClick={checkout}>
                Checkout
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};