import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-bg">
    <img
      src="https://res.cloudinary.com/dpfyel8kq/image/upload/v1717826699/erroring_1_1_zhqhah.png"
      alt="not found"
    />
    <h1>Page Not Found</h1>
    <p>
      We are sorry, the page you requested could not be found.Please go back to
      the homepage
    </p>
    <Link to="/">
      <button type="button" className="home-btn">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
