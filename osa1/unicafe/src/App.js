import React, { useState } from 'react'


const Button = ({handler, text}) => {
  return (
    <button onClick={handler}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  if (text === "Positive")  {
    return(<tr><td>{text}:</td>
      <td>{value} %</td></tr>)
  }
  return(<tr><td>{text}:</td>
    <td>{value}</td></tr>)
}

const Statistics = (props) => {
  const{good, neutral, bad} = props
  let sum = good-bad
  let total = good+ neutral +bad
  if (total === 0) {
    return (
      <div><br/>No feedbacks given</div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <table><tbody>
        <StatisticLine text="Good" value={good}/>
        <StatisticLine text="Neutral" value={neutral}/>
        <StatisticLine text="Bad" value={bad}/>
        <StatisticLine text="All" value={good+neutral+bad}/>
        <StatisticLine text="Average" value={sum/total}/>
        <StatisticLine text="Positive" value={good/total*100}/>
        </tbody></table>
    </div>  
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <>
      <h1>Give feedback</h1>
      <div>
        <Button handler={()=> setGood(good+1)} text="good"/> 
        <Button handler={()=> setNeutral(neutral+1)} text="neutral"/> 
        <Button handler={()=> setBad(bad+1)} text="bad"/>
      </div>
      <Statistics good={good} neutral= {neutral} bad={bad}/>
    </>
  )
}

export default App
