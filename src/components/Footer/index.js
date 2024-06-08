import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-bg">
      <div className="header-logo">
        <img
          src="https://res.cloudinary.com/dpfyel8kq/image/upload/v1717552563/Frame_274_p3rdql.png"
          alt="website-footer-logo"
          className="login-logo"
        />
        <h1 className="heading">Tasty Kitchens</h1>
      </div>
      <div>
        <p>The only thing we are serious about is food. Contact us on</p>
      </div>
      <div>
        <FaPinterestSquare testid="pintrest-social-icon" className="icons" />
        <FaInstagram testid="instagram-social-icon" className="icons" />
        <FaTwitter testid="twitter-social-icon" className="icons" />
        <FaFacebookSquare testid="facebook-social-icon" className="icons" />
      </div>
    </div>
  )
}
