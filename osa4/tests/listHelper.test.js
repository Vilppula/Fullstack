const listHelper = require('../utils/list_helper')

const blogList = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa72b53a676234d17f8',
    title: 'Throwing stones at passing cars and what to expect',
    author: 'Jorgismund Burrows',
    url: 'http://www.istrahtons.org/what_an_awful_idea.html',
    likes: 5000,
    __v: 0
  },
  {
    _id: '5a422aa72b53a676234d17f8',
    title: 'Pushing grannies and feeling awesome about it',
    author: 'Jorgismund Burrows',
    url: 'http://www.istrahtons.org/this_cant_be_good.html',
    likes: 5000,
    __v: 0
  },
  {
    _id: '5a422aa72b53a676234d17f8',
    title: 'Im not giving a s*it anymore',
    author: 'Renee Bonbon',
    url: 'http://www.moveon.pah/or_should_i.html',
    likes: 5000,
    __v: 0
  }
]


describe('dummy', () => {
  test('dummy returns one', () => {
    const result = listHelper.dummy(blogList)
    expect(result).toBe(1)
  })
})  

describe('total likes', () => {
  test('list of two blogs return expected amount of likes', () => {
    const result = listHelper.totalLikes(blogList)
    expect(result).toBe(15005)
  })
})

describe('favourite blog', () => {
  test('blog with most likes is returned', () => {
    const result = listHelper.favoriteBlog(blogList)
    expect(result).toEqual(blogList[1])
  })
})

describe('most blogs', () => {
  test('blogger with most blogs is returned', () => {
    const result = listHelper.mostBlogs(blogList)
    expect(result).toEqual({author:"Jorgismund Burrows", blogs:2})
  })
})

describe('most likes', () => {
  test('blogger with most likes is returned', () => {
    const result = listHelper.mostLikedBlogger(blogList)
    expect(result).toEqual({author:"Jorgismund Burrows", likes:10000})
  })
})