import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const voteComparer = (a, b) => {
    if (a.votes >= b.votes) return -1
    return 1
  }
  
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const anecdotesCopy = [...anecdotes]
    if (filter === '') return anecdotesCopy
    return anecdotesCopy.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted: "${anecdote.content}"`, 5))
  }

  return (
    <>
      {anecdotes.sort(voteComparer).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList