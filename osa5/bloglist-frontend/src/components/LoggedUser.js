import React from 'react'

const LoggedUser = ({ user, logOutHandler }) => {
  return (
    <div>
      <b>{user.name}</b> logged in <button onClick={logOutHandler}>logout</button>
    </div>
  )
}

export default LoggedUser