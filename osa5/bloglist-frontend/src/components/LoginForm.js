import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  loginHandler,
  usernameHandler,
  passwordHandler,
  username,
  password
}) => {

  return(
    <form onSubmit={loginHandler}>
      <div>
        username:
        <input value={username} id='username'
          onChange={usernameHandler}
        />
      </div>
      <div>
        password:
        <input type="password" id='password'
          value={password}
          onChange={passwordHandler}
        />
      </div>
      <button type="submit" id='login'>login</button>
    </form>
  )
}

LoginForm.propTypes = {
  loginHandler: PropTypes.func.isRequired,
  usernameHandler: PropTypes.func.isRequired,
  passwordHandler: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm