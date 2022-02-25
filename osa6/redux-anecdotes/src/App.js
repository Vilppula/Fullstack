import React from 'react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initAnecdotes } from './reducers/anecdoteReducer'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'


const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <br/>
      <Filter/>
      <br/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App