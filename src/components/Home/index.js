import {Component} from 'react'

import Cookies from 'js-cookie'

import Slider from 'react-slick'

import {Redirect} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import 'slick-carousel/slick/slick.css'

import 'slick-carousel/slick/slick-theme.css'

import Header from '../Header/index'

import FoodItems from '../FoodItems/index'

import Footer from '../Footer/index'

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

class Home extends Component {
  state = {
    slider: [],
    selectedOption: sortByOptions[0].value,
    isLoading: false,
  }

  componentDidMount() {
    this.getSlideDetails()
  }

  getSlideDetails = async () => {
    this.setState({isLoading: true})
    const token = Cookies.get('jwt_token')
    const api = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(api, options)
    const data = await response.json()
    console.log('offers details id`s : ', data.id)

    const updatedData = data.offers.map(each => ({
      imageUrl: each.image_url,
      id: each.id,
    }))
    console.log('updated offers data : ', updatedData)

    this.setState({slider: updatedData, isLoading: false})
  }

  render() {
    const {slider, selectedOption, isLoading} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    console.log('Offer details : ', slider)

    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    }
    return (
      <div>
        <Header />
        {isLoading ? (
          <div className="loader-details">
            <Loader
              type="Oval"
              color="#ffa412"
              testid="restaurants-offers-loader"
              height={50}
              width={100}
            />
          </div>
        ) : (
          <div className="slider-container">
            <ul>
              <Slider {...settings}>
                {slider.map(each => {
                  console.log('OFFER ID`S', each.id)

                  return (
                    <li key={each.id} className="caur-list">
                      <img
                        src={each.imageUrl}
                        alt="offer"
                        className="carousel-img"
                      />
                    </li>
                  )
                })}
              </Slider>
            </ul>
          </div>
        )}

        {isLoading ? (
          <div className="loader-details">
            <Loader
              type="Oval"
              color="#ffa412"
              testid="restaurants-list-loader"
              height={50}
              width={100}
            />
          </div>
        ) : (
          <div>
            <FoodItems selectedSortByValue={selectedOption} />
          </div>
        )}
        <Footer />
      </div>
    )
  }
}
export default Home
