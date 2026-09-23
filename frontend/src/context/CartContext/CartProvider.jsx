import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import { notify } from "../../utils/toast";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("modeavelour_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    try {
      localStorage.setItem("modeavelour_cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Cart localStorage error:", error);
    }
  }, [cart]);

  //Cambiamos la logica de las funciones SI usamos el Count para agregar "cantidad"

  const exists = (id) => {
    const exist = cart.some((p) => p.id === id);
    return exist;
  };

  /* -------------------------------------------------------------------------- */
  /*                           Agregamos map y spread                           */
  /* -------------------------------------------------------------------------- */
  const addItem = (item) => {
    if (exists(item.id)) {
      const updatedCart = cart.map((prod) => {
        if (prod.id === item.id) {
          return { ...prod, quantity: prod.quantity + item.quantity };
        }
        return prod;
      });
      setCart(updatedCart);
      notify(`${item.name} añadido al carrito`, "success");
      return;
    }

    setCart([...cart, item]);
    notify(`${item.name} agregado al carrito`, "success");
  };

  /* -------------------------------------------------------------------------- */
  /*                        Eliminar producto con filter                        */
  /* -------------------------------------------------------------------------- */
  const deleteItem = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const filtered = cart.filter((p) => p.id !== id);
    setCart(filtered);
    notify("Producto eliminado del carrito", "error");
  };

  /* -------------------------------------------------------------------------- */
  /*                               Vaciar carrito                               */
  /* -------------------------------------------------------------------------- */
  const clearCart = () => {
    setCart([]);
    try {
      localStorage.setItem("modeavelour_cart", JSON.stringify([]));
    } catch (error) {
      console.error("Clear cart localStorage error:", error);
    }
  };

  const updateQuantity = (id, quantity) => {
    const nextQuantity = Math.max(1, Number(quantity) || 1);

    setCart((currentCart) =>
      currentCart
        .map((product) =>
          product.id === id ? { ...product, quantity: nextQuantity } : product
        )
        .filter((product) => product.quantity > 0)
    );
  };

  /* -------------------------------------------------------------------------- */
  /*                    Calcular total de ítems en el carrito                   */
  /* -------------------------------------------------------------------------- */
  const getTotalItems = () => {
    const totalItems = cart.reduce((acc, p) => acc + p.quantity, 0);
    return totalItems;
  };

  /* -------------------------------------------------------------------------- */
  /*                               Calcular total                               */
  /* -------------------------------------------------------------------------- */
  const total = () => {
    const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);

    return Math.round(total * 100) / 100;
  };

  const checkout = async () => {
    if (!cart.length) {
      notify("Tu carrito está vacío", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          items: cart.map((item) => ({
            productId: Number(item.id),
            quantity: Number(item.quantity) || 1,
          })),
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message = payload?.message || "No se pudo completar la compra";
        notify(message.includes("stock") ? "Stock insuficiente para uno o más productos" : message, "error");
        return;
      }

      const purchasedItems = [...cart];
      setCart([]);
      try {
        localStorage.setItem("modeavelour_cart", JSON.stringify([]));
      } catch (error) {
        console.error("Checkout localStorage clear error:", error);
      }
      notify("Compra realizada con éxito", "success");
      navigate("/checkout/success", {
        replace: true,
        state: {
          order: payload,
          items: purchasedItems,
        },
      });
    } catch (error) {
      console.error("Checkout error:", error);
      notify("No se pudo completar la compra", "error");
    }
  };

  const values = {
    cart,
    addItem,
    clearCart,
    getTotalItems,
    deleteItem,
    updateQuantity,
    total,
    checkout,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};