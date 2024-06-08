import {FaStar} from 'react-icons/fa'

import {BiPlus, BiMinus} from 'react-icons/bi'

import CartContext from '../../Context/CartContext'

import './index.css'

const DetailFoodCard = props => {
  const {data} = props
  const {name, id, imageUrl, foodType, cost, rating} = data
  console.log(foodType)

  return (
    <CartContext.Consumer>
      {value => {
        const {cartItems, addCartItem, increaseQuantity} = value
        const check = cartItems.filter(each => each.id === id)
        console.log('Cart List', cartItems)

        const addToCart = () => {
          const quantity = 1
          addCartItem({...data, quantity})
        }

        const increaseQunatity = () => {
          increaseQuantity(id)
        }

        const decreaseQunatity = () => {
          value.decreaseQuantity(id)
        }

        const checkQuantity = () => {
          const cartItem = cartItems.filter(each => each.id === id)
          console.log('cart quantity count', cartItem[0].quantity)
          return cartItem[0].quantity
        }

        return (
          <li className="card-list" testid="foodItem">
            <div>
              <img src={imageUrl} alt={name} className="card-image" />
            </div>
            <div className="card-details">
              <p>{name}</p>
              <p>Rs.{cost}</p>
              <p>
                <FaStar className="rating-color" /> {rating}
              </p>
              {check.length === 0 ? (
                <div>
                  <button
                    type="button"
                    className="button-card"
                    onClick={addToCart}
                  >
                    Add
                  </button>
                </div>
              ) : (
                <div className="but-alighn-card">
                  <div>
                    <button
                      aria-label="left-arrow"
                      type="button"
                      className="but-plus-minus"
                      onClick={decreaseQunatity}
                      testid="decrement-count"
                    >
                      <BiMinus />
                    </button>
                  </div>

                  <p testid="active-count">{checkQuantity()}</p>
                  <div>
                    <button
                      aria-label="left-arrow"
                      type="button"
                      className="but-plus-minus"
                      testid="increment-count"
                      onClick={increaseQunatity}
                    >
                      <BiPlus />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default DetailFoodCard
