import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'

import './index.css'

const FoodCard = props => {
  const {data} = props
  const {id, name, rating, totalRating, cuisine, imageUrl} = data
  console.log(id)
  return (
    <Link to={`/restaurant/${id}`} className="class-link">
      <li className="list" testid="restaurant-item">
        <div>
          <img src={imageUrl} alt="restaurant" className="img" />
        </div>
        <div className="img-info">
          <h1 className="list-heading">{name}</h1>
          <p className="list-para">{cuisine}</p>
          <div className="rating">
            <FaStar className="rating-color" />
            <p>{rating} </p>
            <p>({totalRating}ratings)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default FoodCard
