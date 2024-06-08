import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {FaStar} from 'react-icons/fa'

import Header from '../Header/index'

import Footer from '../Footer/index'

import DetailFoodCard from '../DetailFoodCard/index'

import './index.css'

class FoodItemsDetails extends Component {
  state = {hotelData: [], itemsData: [], isLoading: false}

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    this.setState({isLoading: true})
    const data = this.props
    const {match} = data
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    console.log(id)
    const api = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
      methode: 'GET',
    }
    const response = await fetch(api, options)
    const details = await response.json()
    console.log(details)
    const hotelDetails = {
      id: details.id,
      costForTwo: details.cost_for_two,
      imageUrl: details.image_url,
      location: details.location,
      cuisine: details.cuisine,
      name: details.name,
      rating: details.rating,
      reviewsCount: details.reviews_count,
    }
    console.log(hotelDetails)
    const itemDetails = details.food_items.map(each => ({
      name: each.name,
      id: each.id,
      imageUrl: each.image_url,
      cost: each.cost,
      rating: each.rating,
      foodType: each.food_type,
    }))
    console.log(itemDetails)
    this.setState({
      hotelData: hotelDetails,
      itemsData: itemDetails,
      isLoading: false,
    })
  }

  render() {
    const {hotelData, itemsData, isLoading} = this.state

    console.log(hotelData)
    console.log(itemsData)
    return (
      <div>
        <Header />
        <div>
          {isLoading ? (
            <div className="loader-details">
              <Loader
                testid="restaurant-details-loader"
                type="Oval"
                color="#ffa412"
                height={50}
                width={100}
              />
            </div>
          ) : (
            <div className="details-bg">
              <div>
                <img
                  src={hotelData.imageUrl}
                  alt="restaurant"
                  className="detail-img"
                />
              </div>
              <div>
                <h1>{hotelData.name}</h1>
                <p>{hotelData.cuisine}</p>
                <p>{hotelData.location}</p>
                <div className="rating-price">
                  <div className="detail-rating">
                    <p>
                      <FaStar className="rating-color" /> {hotelData.rating}
                    </p>
                    <p>{hotelData.reviewsCount} ratings</p>
                  </div>
                  <div>
                    <p>Rs. {hotelData.costForTwo}</p>
                    <p>Cost for two</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!isLoading && (
            <div>
              <ul className="food-card-items">
                {itemsData.map(each => (
                  <DetailFoodCard data={each} key={each.id} />
                ))}
              </ul>
            </div>
          )}
        </div>
        <Footer />
      </div>
    )
  }
}

export default FoodItemsDetails
