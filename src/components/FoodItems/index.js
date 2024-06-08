import {Component} from 'react'

import Cookies from 'js-cookie'

import {CgArrowLeftR, CgArrowRightR} from 'react-icons/cg'

import FoodCard from '../FoodCard/index'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 1,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class FoodItems extends Component {
  state = {
    searchInput: '',
    productsData: [],
    selectedOption: sortByOptions[0].value,
    value: 1,
    offSet: 0,
    totalValue: 0,
  }

  componentDidMount() {
    this.getFoodProducts()
  }

  nextPage = () => {
    const {value, totalValue} = this.state
    if (value < totalValue) {
      this.setState(
        prevState => ({
          offSet: prevState.offSet + 9,
          value: prevState.value + 1,
        }),
        this.getFoodProducts,
      )
    }
  }

  beforePage = () => {
    const {value} = this.state
    if (value > 1) {
      this.setState(
        prevState => ({
          offSet: prevState.offSet - 9,
          value: prevState.value - 1,
        }),
        this.getFoodProducts,
      )
    }
  }

  handleChange = event => {
    this.setState({selectedOption: event.target.value}, this.getFoodProducts)
  }

  getFoodProducts = async () => {
    const {searchInput, selectedOption, offSet} = this.state

    console.log(selectedOption, 'selected Value')

    const token = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offSet}&limit=9&sort_by_rating=${selectedOption}`

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log('product: ', data)
    console.log('Total Products : ', data.total)
    const updatedTotal = data.total % 9
    const updatedData = data.restaurants.map(each => ({
      name: each.name,
      imageUrl: each.image_url,
      id: each.id,
      cuisine: each.cuisine,
      rating: each.user_rating.rating,
      totalRating: each.user_rating.total_reviews,
    }))
    console.log('Updated : ', updatedData)

    this.setState({productsData: updatedData, totalValue: updatedTotal + 1})
  }

  render() {
    const {productsData, selectedOption, value, totalValue} = this.state

    return (
      <div>
        <div className="food-items-header">
          <div>
            <h1>Popular Restaurants</h1>
            <p>
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
          </div>
          <div>
            <p htmlFor="sort-dropdown">Sort By </p>
            <select
              id="sort-dropdown"
              value={selectedOption}
              onChange={this.handleChange}
              className="select-order"
            >
              {sortByOptions.map(option => (
                <option key={option.id} value={option.value}>
                  {option.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
        <ul className="list-items">
          {productsData.map(each => (
            <FoodCard data={each} key={each.id} />
          ))}
        </ul>

        <div className="buttons">
          <button
            aria-label="left-arrow"
            type="button"
            onClick={this.beforePage}
            testid="pagination-left-button"
            className="button-arr"
          >
            <CgArrowLeftR className="arr" />
          </button>
          <p>
            <span testid="active-page-number"> {value} </span> of {totalValue}
          </p>

          <button
            aria-label="left-arrow"
            type="button"
            onClick={this.nextPage}
            testid="pagination-right-button"
            className="button-arr"
          >
            <CgArrowRightR className="arr" />
          </button>
        </div>
      </div>
    )
  }
}

export default FoodItems
