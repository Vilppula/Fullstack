import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import AddBlogForm from './AddBlogForm'


const blog = {
  title: 'Leave Väyrynen alone!',
  author: 'Paavo Väyrynen',
  user: {
    name: 'Anssi',
    username: 'anssi'
  },
  url: 'www.netti.com',
  likes: 12
}

const mockHandler = jest.fn()
let testComponent = null




describe('Blog-komponentin testit', () => {
  beforeEach(async () => {
    testComponent = render(
      <Blog blog={blog} blogUpdater={mockHandler}/>
    )
  })

  test('vain blogin title ja author renderöidään oletusarvoisesti', async () => {
    expect(testComponent.getByText('Leave Väyrynen alone!')).toBeDefined()
    expect(testComponent.getByText('Paavo Väyrynen')).toBeDefined()
    expect(testComponent.queryByText('www.netti.com')).toBeFalsy()
    expect(testComponent.queryByText('Likes:')).toBeFalsy()
  })


  test('view-napin painalluksen jälkeen blogin muut tiedot renderöityvät', async () => {
    expect(testComponent.queryByText('www.netti.com')).toBeFalsy()
    expect(testComponent.queryByText('Likes:')).toBeFalsy()
    const button = testComponent.getByText('view')
    fireEvent.click(button)
    expect(testComponent.container).toHaveTextContent('Likes: 12')
    expect(testComponent.container).toHaveTextContent('www.netti.com')
  })


  test('like-napin painanaminen kahdesti kutsuu tapahtumankäsittelijää kahdesti', async () => {
    const viewbutton = testComponent.getByText('view')
    fireEvent.click(viewbutton)
    const likebutton = testComponent.getByText('like')
    fireEvent.click(likebutton)
    fireEvent.click(likebutton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})


test('blogia lisättäessä handleri saa syötetyt tiedot', async () => {
  const testBlogForm = render(
    <AddBlogForm formSubmitter={mockHandler}/>
  )
  const form = testBlogForm.container.querySelector('#form')
  const title = testBlogForm.container.querySelector('#title')
  const author = testBlogForm.container.querySelector('#author')
  const url = testBlogForm.container.querySelector('#url')
  fireEvent.change(title, { target: { value: 'titteli tähän' } })
  fireEvent.change(author, { target: { value: 'kirjoittaja tähän' } })
  fireEvent.change(url, { target: { value: 'url tähän' } })
  fireEvent.submit(form)
  const blog = (mockHandler.mock.calls[0][0])
  expect(blog['title']).toBe('titteli tähän')
  expect(blog['author']).toBe('kirjoittaja tähän')
  expect(blog['url']).toBe('url tähän')
})