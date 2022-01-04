const aggregate = (blogs) => {
  let bloggerList = []
  blogs.forEach(blog => {
    let bloggerEntry = bloggerList.find(entry => entry.author === blog.author)
    if (bloggerEntry !== undefined) {
      bloggerList = bloggerList.map(entry =>
        entry.author === bloggerEntry.author
        ? {...entry, blogs: bloggerEntry.blogs +1, likes: bloggerEntry.likes + blog.likes}
        : entry
      )
    } else {
      bloggerList = bloggerList.concat({author: blog.author, blogs: 1, likes: blog.likes})
    }
  })
  return bloggerList
}



const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  const reducer = (sum, nextBlog) => sum + nextBlog.likes
  const allLikes = blogs.reduce(reducer, 0)
  return allLikes
}


const favoriteBlog = (blogs) => {
  var blogWithMostLikes = null
  blogs.forEach(blog => {
    if (blogWithMostLikes === null || blogWithMostLikes.likes < blog.likes)  {
      blogWithMostLikes = blog
    }
  })
  return blogWithMostLikes
}


const mostBlogs = (blogs) => {
  let bloggerList = aggregate(blogs)
  let bloggerWithMostBlogs = null
  bloggerList.forEach(entry => {
    if(bloggerWithMostBlogs === null || bloggerWithMostBlogs.blogs < entry.blogs) {
      bloggerWithMostBlogs = {author: entry.author, blogs: entry.blogs}
    }
  })
  return bloggerWithMostBlogs
}


const mostLikedBlogger = (blogs) => {
  let bloggerList = aggregate(blogs)
  let bloggerWithMostLikes = null
  bloggerList.forEach(entry => {
    if(bloggerWithMostLikes === null || bloggerWithMostLikes.likes < entry.likes) {
      bloggerWithMostLikes = {author: entry.author, likes: entry.likes}
    }
  })
  return bloggerWithMostLikes
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikedBlogger
}