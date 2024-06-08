import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter, Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="container">
        <div>
          <form className="form-container" onSubmit={this.submitForm}>
            <div className="login-form-top">
              <img
                src="https://res.cloudinary.com/dpfyel8kq/image/upload/v1717552563/Frame_274_p3rdql.png"
                alt="website logo"
                className="login-logo"
              />
              <h1 className="heading">Tasty Kitchens</h1>
              <h2 className="login-p">Login</h2>
            </div>

            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>

            <button type="submit" className="login-button">
              Login
            </button>

            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>

        <div>
          <img
            src="https://res.cloudinary.com/dpfyel8kq/image/upload/v1717382341/nxt-wave-project-lg-login_k2rygg.jpg"
            alt="website login"
            className="logo-image"
          />
        </div>
      </div>
    )
  }
}

export default LoginForm
