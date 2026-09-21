import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext/useCartContext";
import { Item } from "../Item/Item";
import "./Cart.css";

export const Cart = () => {

  const { cart, clearCart, deleteItem, total, checkout, getTotalItems } = useCartContext();

  return (
    <section className="cart-container">
      <h2 className="cart-title">Shopping cart</h2>
      <div className="cart-products-container">
        {cart.length ? (
          cart.map((prod) => (
            <Link to={`/detail/${prod.id}`} key={prod.id}>
              <Item key={prod.id} {...prod}>
                <span>Quantity: {prod.quantity}</span>
                <button className="btn btn-delete" onClick={(e) => deleteItem(e, prod.id)}>
                  Remove from cart
                </button>
              </Item>
            </Link>

          ))
        ) : (
          <p className="cart-empty">Your cart is empty</p>
        )}
      </div>

      <div className="btn-container">
        <div className="total-pagar">
          <p>Total to pay ({getTotalItems()} products): ${total()}</p>

        </div>
        <button className="btn" onClick={clearCart}>
          Clear cart
        </button>
        <button className="btn" onClick={checkout}>
          Checkout
        </button>
      </div>
    </section>
  );
};