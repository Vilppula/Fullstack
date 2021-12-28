import React from 'react'

const Course = (props) => {
    return (
        <div>
            <Header name={props.course.name}/>
            <Content parts={props.course.parts}/>
            <Total parts={props.course.parts}/>
        </div>   
    )
}

const Header = (props) => {
    return (
        <h2>{props.name}</h2>
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
            <b>
            Total of {props.parts.reduce((total, part) => total = total + part.exercises, 0)} exercises
            </b>  
        </div>
    )
}

export default Course