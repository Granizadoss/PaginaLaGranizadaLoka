import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (producto) => {
    setCart((carritoActual) => {
      const productoExistente = carritoActual.find(
        (item) => item.id === producto.id
      );

      if (productoExistente) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item
        );
      }

      return [
        ...carritoActual,
        {
          ...producto,
          cantidad: 1,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((carritoActual) =>
      carritoActual.filter((item) => item.id !== id)
    );
  };

  const increaseQuantity = (id) => {
    setCart((carritoActual) =>
      carritoActual.map((item) =>
        item.id === id
          ? {
              ...item,
              cantidad: item.cantidad + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((carritoActual) =>
      carritoActual
        .map((item) =>
          item.id === id
            ? {
                ...item,
                cantidad: item.cantidad - 1,
              }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const getTotal = () => {
    return cart.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    );
  };

  const getTotalItems = () => {
    return cart.reduce(
      (total, item) => total + item.cantidad,
      0
    );
  };

  // NUEVO: vaciar completamente el carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        getTotal,
        getTotalItems,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}