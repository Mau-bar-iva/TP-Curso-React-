import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext/useCartContext";
import { Item } from "../Item/Item";

import "./Cart.css";

export const Cart = () => {
  const { cart, clearCart, deleteItem, total, checkout, getTotalItems } = useCartContext();

  return (
    <section className="cart-container">
      
      {cart.length ? (
        <>
        <h2 className="products-title">Carrito de Compras</h2>
      
        {
          cart.map((prod) => (
          <Item key={prod.id} {...prod}>
            <span>Cantidad: {prod.quantity}</span>
            <button className="btn btn-delete" onClick={() => deleteItem(prod.id)}>
              Eliminar
            </button>
          </Item>
        ))

        }
        </>
        
      ) : (
        <p className="cart-empty">Tu carrito está vacío</p>
      )}

      {cart.length ? (
        <div className="btn-container">
          <div className="total-pagar">
            <p>Total a pagar ({getTotalItems()} productos): ${total()}</p>
            
          </div>
          <button className="btn" onClick={checkout}>
            Finalizar compra
          </button>
          <button className="btn" onClick={clearCart}>
            Vaciar carrito
          </button>
        </div>
      ) : (
        <Link className="btn btn-back" to="/">
          Volver al inicio
        </Link>
      )}
    </section>
  );
};