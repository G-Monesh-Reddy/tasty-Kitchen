import {Link} from 'react-router-dom'

import './index.css'

const EmptyCart = () => (
  <div className="cart-empty-view-container">
    <img
      src="https://res.cloudinary.com/dpfyel8kq/image/upload/v1717648828/cooking_1_1_ahflhn.png"
      className="cart-empty-image"
      alt="empty cart"
    />
    <h1 className="cart-empty-heading">No Orders Yet!</h1>
    <p>Your cart is empty. Add something from the menu.</p>

    <Link to="/">
      <button type="button" className="shop-now-btn">
        Order Now
      </button>
    </Link>
  </div>
)

export default EmptyCart
