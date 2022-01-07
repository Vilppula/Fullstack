import React, { useState } from 'react'

const Blog = ({ blog, blogUpdater, username, blogDeleter }) => {
  const [showInfo, setShowInfo] = useState(false)
  const [buttonText, setButtonText] = useState('view')

  const changeInfoView = (event) => {
    event.preventDefault()
    setShowInfo(!showInfo)
    if (!showInfo) {
      setButtonText('hide')
    } else {
      setButtonText('view')
    }
  }

  const addLike = (event) => {
    event.preventDefault()
    const updateThis = { ...blog, likes: blog.likes+1 }
    blogUpdater(updateThis)
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog "${blog.title}"?`)) {
      blogDeleter(blog)
    }
  }

  return (
    <div className={'blog'}>
      <span><b className='title'>{blog.title}</b>___by: <em>{blog.author}</em> </span>
      <button className={'blogViewButton'} onClick={changeInfoView} id='viewHideButton'>
        {buttonText}
      </button>
      {showInfo ?
        <div id='showInfo'>
          <div>Url: {blog.url}</div>
          <div>
            <span>Likes: {blog.likes} </span>
            <button onClick={addLike} id='likeButton'>like</button>
          </div>
          <div>Added: {blog.user.name}</div>
          {username === blog.user.username ?
            <button onClick={deleteBlog} id='deleteButton'>delete</button> : <></>}
        </div>
        : <></>}
    </div>
  )
}

export default Blog