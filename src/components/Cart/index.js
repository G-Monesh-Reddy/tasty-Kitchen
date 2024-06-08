import {Link} from 'react-router-dom'

import CartContext from '../../Context/CartContext'

import EmptyCart from '../EmptyCart/index'

import Header from '../Header/index'

import Footer from '../Footer/index'

import CartCard from '../CartCard/index'

import Summary from '../Summary/index'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartItems, isPaymentPage, changePaymentPage} = value
      console.log('isPaymentPage : ', isPaymentPage)

      const chnagePage = () => {
        changePaymentPage()
      }

      const EmptyPage = () => <EmptyCart />

      const PaymentPage = () => (
        <div className="paymentpage">
          <div>
            <img
              src="https://res.cloudinary.com/dpfyel8kq/image/upload/v1717822913/check-circle.1_1_vrdgoz.png"
              alt="Payment Successful"
            />
            <h1>Payment Successful</h1>
            <p>
              Thank you for ordering. Your payment is successfully completed.
            </p>
            <Link to="/">
              <button
                type="button"
                onClick={chnagePage}
                className="payment-but"
              >
                Go To Home Page
              </button>
            </Link>
          </div>
        </div>
      )

      const CartDetails = () => (
        <div className="cart-bg">
          <div className="cart-header">
            <p>Item</p>
            <p>Quantity</p>
            <p>Price</p>
          </div>
          <CartCard />
          <hr />
          <Summary />
        </div>
      )

      let content

      switch (true) {
        case isPaymentPage:
          content = <PaymentPage />
          break
        case cartItems.length === 0:
          content = <EmptyPage />
          break

        default:
          content = <CartDetails />
      }

      return (
        <div>
          <Header />
          {content}
          <Footer />
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
