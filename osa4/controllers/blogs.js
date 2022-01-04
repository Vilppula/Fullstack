const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', (request, response) => {
  Blog
    .find({}).populate('user', {username: 1, name: 1})
    .then(blogs => {
      response.json(blogs.map(blog => blog.toJSON()))
    })
})


blogsRouter.get('/:id', async (request, response) => {
  const foundBlog = await Blog.findById(request.params.id)
    .populate('user', {username: 1, name: 1})
    if (foundBlog) {
      response.status(200).json(foundBlog.toJSON())
    } else {
      response.status(404).end()
    } 
})


blogsRouter.post('/', async (request, response) => {
  const blogData = request.body
  if (!request.user) {
    return response.status(401).json({error: 'token missing or not accepted'})
  }
  
  const blog = new Blog({
    title: blogData.title,
    author: blogData.author,
    user: request.user,
    url: blogData.url,
    likes: blogData.likes
  })
  
  const savedBlog = await blog.save()
  const user = await User.findById(request.user)
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog.toJSON())
})


blogsRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (!request.user) {
    return response.status(401).json({error: 'token missing or not accepted'})
  } else if (blog.user.toString() !== request.user.toString()) {
    return response.status(401).json({error: 'not allowed'})
  }
  const user = await User.findById(request.user)
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
  user.blogs = user.blogs.filter(blog => blog.id !== deletedBlog.id)
  await user.save()
  response.status(200).json(deletedBlog.toJSON())
})


blogsRouter.put('/:id', (request, response, next) => {
  const id = request.params.id
  
  Blog
    .findByIdAndUpdate(id, {...request.body}, { new:true })
    .then(updatedBlog => {
      if (updatedBlog !== null) {
        response.status(200).json(updatedBlog.toJSON())
      } else {
        response.status(400).end()
      }  
    })
    .catch(error => next(error))
})


module.exports = blogsRouter