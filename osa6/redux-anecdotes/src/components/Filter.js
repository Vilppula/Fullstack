import { connect } from 'react-redux'
import { filterWith } from '../reducers/filterReducer'

const Filter = (props) => {

  const filterWithInput = (event) => {
    event.preventDefault()
    const value = event.target.value
    props.filterWith(value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={filterWithInput} />
    </div>
  )
}

const mapDispatchToProps = {
  filterWith
}

export default connect(null, mapDispatchToProps)(Filter)