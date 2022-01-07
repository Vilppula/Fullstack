import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoggedUser from './components/LoggedUser'
import Message from './components/Message'
import AddBlogForm from './components/AddBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [headerText, setHeaderText] = useState('')
  const [usernameField, setUsernameField] = useState('')
  const [passwordField, setPasswordField] = useState('')
  const [message, setMessage] = useState(null)
  const [messageStyle, setMessageStyle] = useState('hidden')
  const [blogFormVisibility, setBlogFormVisibility] = useState(true)
  const [loginFormVisibility, setLoginFormVisibility] = useState(true)

  //================================================ HELPERS ===================
  const messageHelper = (style, message) => {
    setMessage(message)
    setMessageStyle(style)
    setTimeout(() => {
      setMessage('')
      setMessageStyle('hidden')
    }, 5000)
  }

  const likeComparer = (blog1, blog2) => {
    if (blog1.likes < blog2.likes) {
      return 1
    } else {
      return -1
    }
  }

  //================================================ EFFECTS ==================
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserAsJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserAsJSON) {
      const user = JSON.parse(loggedUserAsJSON)
      setUser(user)
      blogService.setToken(user.token)
      setHeaderText('Blogilista')
    } else {
      setHeaderText('Login')
    }
  }, [])

  //================================================ HANDLERS ==================

  const usernameFieldHandler = async (event) => {
    event.preventDefault()
    setUsernameField(event.target.value)
  }

  const passwordFieldHandler = async (event) => {
    event.preventDefault()
    setPasswordField(event.target.value)
  }


  const loginHandler = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: usernameField, password: passwordField
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      setHeaderText('Blogit')
      blogService.setToken(user.token)
      setUsernameField('')
      setPasswordField('')
    }
    catch(exeption) {
      messageHelper('error', 'wrong username or password')
      setPasswordField('')
    }
  }

  const blogFormSubmitter = async (newBlog) => {
    try {
      const savedBlog = await blogService.sendBlog(newBlog)
      setBlogs(blogs.concat(savedBlog))
      messageHelper('success', `added blog '${savedBlog.title}'`)
      setBlogFormVisibility(false)
    } catch(exception) {
      messageHelper('error', `couldn't add blog '${newBlog.title}'`)
    }
  }

  const blogUpdater = async (updateThis) => {
    try {
      const updatedBlog = await blogService.updateBlog(updateThis)
      setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
      messageHelper('success', `You liked blog ${updatedBlog.title}`)
    } catch(exception) {
      messageHelper('error', exception)
    }
  }

  const blogDeleter = async (deleteThis) => {
    try {
      console.log(deleteThis)
      const deletedBlog = await blogService.deleteBlog(deleteThis)
      setBlogs(blogs.filter(blog => blog.id !== deletedBlog.id))
    } catch(exception) {
      messageHelper('error', exception)
    }
  }

  const logOutHandler = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setHeaderText('Login')
  }

  //================================================ CONTENT OPTIONS ==================
  const loginForm = () => {
    return (
      <Togglable showLabel='' hideLabel='' buttonStyle={'none'}
        visibility={loginFormVisibility} setVisibility={setLoginFormVisibility}>
        <LoginForm
          loginHandler = {loginHandler}
          usernameHandler = {usernameFieldHandler}
          passwordHandler = {passwordFieldHandler}
          username = {usernameField}
          password = {passwordField}
        />
      </Togglable>
    )
  }

  const blogList = () => {
    return (
      <>
        <LoggedUser user ={user} logOutHandler={logOutHandler}/>
        <h2>Add blogs</h2>
        <Togglable showLabel='add' hideLabel='hide' buttonStyle={''}
          visibility={blogFormVisibility} setVisibility={setBlogFormVisibility}
        >
          <AddBlogForm formSubmitter={blogFormSubmitter}/>
        </Togglable>
        <br/>
        {blogs.sort(likeComparer).map(blog =>
          <Blog key={blog.id}
            blog={blog} blogUpdater={blogUpdater}
            username={user.username} blogDeleter={blogDeleter}
          />
        )}
      </>
    )
  }

  //================================================ RENDER EXPORTS ==================
  return (
    <div>
      <h1>{headerText}</h1>
      <Message style = {messageStyle} message = {message}/>
      {user === null ?
        loginForm() : blogList()}
    </div>
  )
}

export default App