import CartContext from '../../Context/CartContext'

import './index.css'

const Summary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartItems, changePaymentPage, removeAllItem} = value
      console.log('Cart Items : ', cartItems)

      const cartAmount = cartItems.map(each => each.cost * each.quantity)
      console.log('Cart Amount : ', cartAmount)
      const totalAmount = cartAmount.reduce((val, acc) => val + acc)
      console.log(totalAmount)
      const changePage = () => {
        removeAllItem()
        changePaymentPage()
      }
      return (
        <div className="summary-bg">
          <p>Order Total :</p>
          <div>
            <p className="cost-summary" testid="total-price">
              {' '}
              Rs.{totalAmount}
            </p>
            <button className="summary-but" type="button" onClick={changePage}>
              Place Order
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Summary
