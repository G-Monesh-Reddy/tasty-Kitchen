import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="header-logo">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dpfyel8kq/image/upload/v1717552563/Frame_274_p3rdql.png"
            alt="website logo"
            className="login-logo"
          />
        </Link>

        <h1 className="heading">Tasty Kitchens</h1>
      </div>
      <div className="nav-options">
        <ul className="nav-menu">
          <Link to="/" className="nav-link">
            <li className="nav-menu-item">Home</li>
          </Link>

          <Link to="/cart" className="nav-link">
            <li className="nav-menu-item">Cart</li>
          </Link>
        </ul>
        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
