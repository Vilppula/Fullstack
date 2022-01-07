import React from 'react'

const Message = ({ style, message }) => {
  return (
    <div className ={style}>{message}</div>
  )
}

export default Message