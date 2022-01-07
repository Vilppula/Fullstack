import React from 'react'
import Proptypes from 'prop-types'

const Togglable = (props) => {
  const contentHidden = { display: !props.visibility ? '' : 'none' }
  const contentShown = { display: props.visibility ? '' : 'none' }

  const changeVisibility = () => {
    props.setVisibility(!props.visibility)
  }

  return (
    <>
      {/*BUTTON FOR SHOWING CONTENT*/}
      <div style={contentHidden}>
        <button style={{ display: props.buttonStyle }} onClick={changeVisibility}><b>{props.showLabel}</b></button>
      </div>
      {/*CONTENT AND BUTTON FOR HIDING CONTENT*/}
      <div style={contentShown}>
        <button style={{ display: props.buttonStyle }} onClick={changeVisibility}><b>{props.hideLabel}</b></button>
        <div className = {'toggleContent'}>
          {props.children}
        </div>
      </div>
    </>
  )
}

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  showLabel: Proptypes.string.isRequired,
  hideLabel: Proptypes.string.isRequired,
  visibility: Proptypes.bool.isRequired,
}

export default Togglable