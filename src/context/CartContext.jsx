import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const exist = cartItems.find((x) => x.id === item.id);
    if (exist) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, qty: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    const exist = cartItems.find((x) => x.id === item.id);
    if (exist.qty === 1) {
      setCartItems((prevCartItems) =>
        prevCartItems.filter((x) => x.id !== item.id)
      );
    } else {
      setCartItems((prevCartItems) =>
        prevCartItems.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty - 1 } : x
        )
      );
    }
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems.reduce((price, item) => item.price * item.qty + price, 0);
  };

  const updateQuantity = (item, amount) => {
    const updatedCart = cartItems.map((x) =>
      x.id === item.id ? { ...x, qty: x.qty + amount } : x
    );
    setCartItems(updatedCart.filter((item) => item.qty > 0));
  };

  const addQty = (item) => updateQuantity(item, 1);

  const removeQty = (item) => updateQuantity(item, -1);

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        getCartCount,
        getCartSubTotal,
        addQty,
        removeQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
