import react from "react"

const Course = (props) => {
    return (
      <>
        <Header name={props.course.name}/>
        <Content parts={props.course.parts}/>
        <Total parts={props.course.parts}/>
      </>
    )
}

export default Course
  
const Header = (props) => {
    return (
        <h1>{props.name}</h1>
    )
}
  
const Content = (props) => {
    return (
        <div>
        {props.parts.map(part => {
            return <p key={part.id}>{part.name} {part.exercises}</p>
        })}
        </div>  
    )
}
  
const Total = (props) => {
    return (
      <div>
        <b>total of {props.parts.reduce((total, part) => total = total + part.exercises, 0)} exercises</b>     
      </div>
    )
}