import { createContext, useState, useContext } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  // Add item or increase quantity
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item._id === product._id)
      if (exists) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  // Decrease quantity by 1 — remove if reaches 0
  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  // Remove product completely
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id))
  }

  // Clear entire cart
  const clearCart = () => setCartItems([])

  // Total price
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  // Total item count
  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart, cartTotal, cartCount }}
    >
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext)