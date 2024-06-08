import {BiMinus, BiPlus} from 'react-icons/bi'

import CartContext from '../../Context/CartContext'

import './index.css'

const CartCard = () => (
  <CartContext.Consumer>
    {value => {
      const {cartItems, increaseQuantity, decreaseQuantity} = value

      return (
        <div testid="cartItem">
          {cartItems.map(each => (
            <div className="cart-header-card" key={each.id}>
              <div className="cart-card-div">
                <img
                  src={each.imageUrl}
                  alt={each.name}
                  className="cart-card-img"
                />
                <p>{each.name}</p>
              </div>
              <div className="but-align-cart-card">
                <div>
                  <button
                    aria-label="left-arrow"
                    type="button"
                    className="but-plus-minus"
                    testid="decrement-quantity"
                    onClick={() => decreaseQuantity(each.id)}
                  >
                    <BiMinus />
                  </button>
                </div>
                <p testid="item-quantity">{each.quantity}</p>
                <div>
                  <button
                    aria-label="right-arrow"
                    type="button"
                    className="but-plus-minus"
                    testid="increment-quantity"
                    onClick={() => increaseQuantity(each.id)}
                  >
                    <BiPlus />
                  </button>
                </div>
              </div>
              <div>
                <p>{each.quantity * each.cost}</p>
              </div>
            </div>
          ))}
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartCard
