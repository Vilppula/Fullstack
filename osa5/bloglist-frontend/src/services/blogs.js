import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const sendBlog = async newBlog => {
  const config = {
    headers: { authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateBlog = async updateThis => {
  const response = await axios.put(`${baseUrl}/${updateThis.id}`, updateThis)
  return response.data
}

const deleteBlog = async deleteThis => {
  const config = {
    headers: { authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${deleteThis.id}`, config)
  return response.data
}

export default { getAll, setToken, sendBlog, updateBlog, deleteBlog }