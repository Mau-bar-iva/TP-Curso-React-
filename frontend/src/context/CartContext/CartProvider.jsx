import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import { reconcileCartItems } from "./cartRevalidation";
import { notify } from "../../utils/toast";
import { getProducts } from "../../services/products";

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

  useEffect(() => {
    let isMounted = true;

    const revalidateCart = async () => {
      try {
        const catalog = await getProducts();
        if (!isMounted) return;

        const sanitizedCart = reconcileCartItems(cart, catalog);
        const hasChanges =
          sanitizedCart.length !== cart.length ||
          sanitizedCart.some((item, index) => {
            const previous = cart[index];
            return !previous || item.id !== previous.id || item.quantity !== previous.quantity || Number(item.price) !== Number(previous.price || 0);
          });

        if (hasChanges) {
          setCart(sanitizedCart);

          if (sanitizedCart.length < cart.length) {
            notify({
              message: "Productos sin stock o no disponibles fueron removidos del carrito.",
              type: "info",
            });
          }
        }
      } catch (error) {
        console.error("Cart revalidation error:", error);
      }
    };

    revalidateCart();

    return () => {
      isMounted = false;
    };
  }, [cart]);

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
      notify({ message: `${item.name} añadido al carrito`, type: 'success', imageUrl: item.imageUrl });

      return;
    }

    setCart([...cart, item]);
    notify({ message: `${item.name} añadido al carrito`, type: 'success', imageUrl: item.imageUrl });

  };

  /* -------------------------------------------------------------------------- */
  /*                        Eliminar producto con filter                        */
  /* -------------------------------------------------------------------------- */
  const deleteItem = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const removed = cart.find((p) => p.id === id);
    setCart(cart.filter((p) => p.id !== id));
    notify({ message: 'Producto eliminado del carrito', type: 'error', imageUrl: removed?.imageUrl });
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
    const targetProduct = cart.find((product) => product.id === id);
    const stockLimit = Number(targetProduct?.stock || 0);
    const nextQuantity = stockLimit > 0
      ? Math.min(Math.max(1, Number(quantity) || 1), stockLimit)
      : Math.max(1, Number(quantity) || 1);

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
    const total = cart.reduce((acc, p) => acc + Number(p.price || 0) * Number(p.quantity || 1), 0);

    return Math.round(total * 100) / 100;
  };

  const checkout = async () => {
    if (!cart.length) {
      notify("Tu carrito está vacío", "error");
      return;
    }

    try {
      const catalog = await getProducts();
      const sanitizedCart = reconcileCartItems(cart, catalog);

      if (!sanitizedCart.length) {
        setCart([]);
        notify({ message: "Tu carrito está vacío o los productos ya no están disponibles.", type: "error" });
        return;
      }

      if (sanitizedCart.length !== cart.length || sanitizedCart.some((item, index) => item.id !== cart[index]?.id || item.quantity !== cart[index]?.quantity)) {
        setCart(sanitizedCart);
      }

      const response = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          items: sanitizedCart.map((item) => ({
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

      const purchasedItems = [...sanitizedCart];
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