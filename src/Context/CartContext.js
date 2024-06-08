import React from 'react'

const CartContext = React.createContext({
  cartItems: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  isPaymentPage: false,
  changePaymentPage: () => {},
  removeAllItem: () => {},
})

export default CartContext
