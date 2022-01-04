const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)

let testUser = null
let testToken = null

beforeEach(async () => {
  await User.deleteMany({})
  const userResp = await api.post('/api/users/').send(helper.initUserList[0]) //Simulate creation of a new user
  testUser = {...helper.initUserList[0], id: userResp.body.id}
  const loginData = await api.post('/api/login').send(testUser)
  testToken = `Bearer ${loginData.body.token}`

  await Blog.deleteMany({})
  await Blog.insertMany(helper.initBlogList)
})




describe ('blogien hakeminen', () => {
  test('palutetaan oikea määrä blogeja JSON-muodossa', async () => {
    const res = await api.get('/api/blogs/')
    expect(res.status).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body).toHaveLength(helper.initBlogList.length)
  })
  
  test('blogin tunniste on muotoa id' , async () => {
    const res = await api.get('/api/blogs/')
    const blog = res.body[0]
    expect(blog.id).toBeDefined()
  })
})




describe ('blogin lisääminen', () => {
  test('blogin lisääminen onnistuu', async () => {
    
    await api
      .post('/api/blogs/')
      .send(helper.extraBlog)
      .set('authorization', testToken)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const res = await api.get('/api/blogs/')
    expect(res.body).toHaveLength(helper.initBlogList.length +1)
    const id = res.body.find(obj =>  obj.title === helper.extraBlog.title 
                                    && obj.url === helper.extraBlog.url)
    expect(id).toBeDefined()
  })

  test('jos blogille ei anneta likes-arvoa se asetetaan nollaksi', async () => {
    const newExtraBlog = {
      title: "Where am I?",
      author: "MasterBlaster",
      url: "http://blog.greedycan.net/exposingMyUnderbelly/vitals.html",
    }
    await api.post('/api/blogs/').send(newExtraBlog).set('authorization', testToken)
    const res = await api.get('/api/blogs/')
    const likesList = res.body.reduce((list, obj) => list.concat(obj.likes), [])
      .filter(entry => entry !== undefined)
    expect(likesList).toHaveLength(helper.initBlogList.length +1)
  })

  test('jos title- ja url-kentät puuttuvat, vastataan status-koodilla 400 Bad request', async () => {
    const newExtraBlog = {author: "MasterBlaster", likes: 2125125125}
    await api.post('/api/blogs/').send(newExtraBlog).set('authorization', testToken)
      .expect(400)
  })

  test('jos pyynnössä ei ole tokenia palautetaan statuskoodi 401', async () => {
    await api.post('/api/blogs/').send(helper.extraBlog)
      .expect(401)
  })
})




describe('blogin poistaminen', ()=> {
  test('blogin poistaminen onnistuu', async () => {
    const blogData = await api
      .post('/api/blogs/')
      .send(helper.extraBlog)
      .set('authorization', testToken)
    await api.delete(`/api/blogs/${blogData.body.id}`).set('authorization', testToken)
      .expect(200)
    const res = await api.get('/api/blogs/')
    expect(res.body.find(obj => obj.id.toString() === blogData.body.id)).toBe(undefined) 
  })

  test('blogin voi poistaa vain blogin lisännyt käyttäjä', async () => {
    const blogData = await api.post('/api/blogs/').send(helper.extraBlog).set('authorization', testToken)
    const userResp = await api.post('/api/users/').send(helper.initUserList[1])
    anotherTestUser = {...helper.initUserList[1], id: userResp.body.id}
    const loginData = await api.post('/api/login').send(anotherTestUser)
    anotherTestToken = `Bearer ${loginData.body.token}`
    await api.delete(`/api/blogs/${blogData.body.id}`).set('authorization', anotherTestToken)
      .expect(401)
  })
})




test('blogin tietoja voi päivittää', async () => {
  const blog = helper.initBlogList[4]
  updatedBlog = {...blog, likes: 555}
  await api.put(`/api/blogs/${updatedBlog._id}`)
    .send(updatedBlog)
    .expect(200)
  const res = await api.get(`/api/blogs/${updatedBlog._id}`)
  expect(res.body.likes).toBe(555)   
})

describe('käyttätietojen käsittely', () => {
  test('username ja password käsittävät vähintään kolme merkkiä', async () => {
    const user = helper.initUserList[0]
    const user1 = {...user, username: user.username.slice(0,1)}
    const user2 = {...user, password: user.password.slice(0,1)}
    await api.post('/api/users').send(user1).expect(400)
    await api.post('/api/users').send(user2).expect(400)
  })
})

afterAll(()=> {
  mongoose.connection.close()
})