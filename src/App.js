import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import CartContext from './Context/CartContext'
import Login from './components/Login'
import Home from './components/Home'
import FoodItemsDetails from './components/FoodItemsDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

class App extends Component {
  state = {cartItems: [], isPaymentPage: false}

  componentDidMount() {
    const storedCartDataString = localStorage.getItem('cartData')
    if (storedCartDataString) {
      const storedCartData = JSON.parse(storedCartDataString)
      this.setState({cartItems: storedCartData})
    }
  }

  changePaymentPage = () => {
    this.setState(prevState => ({
      isPaymentPage: !prevState.isPaymentPage,
    }))
  }

  addCartItem = data => {
    this.setState(prevState => {
      const updatedCartItems = [...prevState.cartItems, data]
      localStorage.setItem('cartData', JSON.stringify(updatedCartItems))
      return {cartItems: updatedCartItems}
    })
  }

  increaseQuantity = id => {
    this.setState(prevState => {
      const updatedCartList = prevState.cartItems.map(item => {
        if (item.id === id) {
          return {...item, quantity: item.quantity + 1}
        }
        return item
      })
      localStorage.setItem('cartData', JSON.stringify(updatedCartList))
      return {cartItems: updatedCartList}
    })
  }

  removeAllItem = () => {
    this.setState({cartItems: []}, () => {
      localStorage.setItem('cartData', JSON.stringify([]))
    })
  }

  decreaseQuantity = id => {
    this.setState(prevState => {
      const updatedCartList = prevState.cartItems
        .map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity - 1}
          }
          return item
        })
        .filter(item => item.quantity > 0)
      localStorage.setItem('cartData', JSON.stringify(updatedCartList))
      return {cartItems: updatedCartList}
    })
  }

  render() {
    const {cartItems, isPaymentPage} = this.state
    return (
      <CartContext.Provider
        value={{
          cartItems,
          addCartItem: this.addCartItem,
          deleteCartItem: this.deleteCartItem,
          decreaseQuantity: this.decreaseQuantity,
          increaseQuantity: this.increaseQuantity,
          removeAllItem: this.removeAllItem,
          changePaymentPage: this.changePaymentPage,
          isPaymentPage,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={FoodItemsDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
