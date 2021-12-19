import React from 'react'

const App = () => {
  const course = {
    name:'Half Stack application development',
    parts: [ 
      {
        name:'Fundamentals of React',
        exercises: 10
      },
      {
        name:'Using props to pass data',
        exercises: 7
      } , 
      {
        name:'State of a component',
        exercises: 14
      }  
    ]
  }

  return (
    <>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => {
        return <p key={part.name}>{part.name} {part.exercises}</p>
      })}
    </div>  
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        {props.parts.reduce((total, part) => total = total + part.exercises, 0)}
      </p>  
    </div>
  )
}


export default App