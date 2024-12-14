import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad;
  if (total === 0) {
    return (
      <div>
        <h1><b>Statistics</b></h1>
        <p>No feedback given</p>
      </div>
    )
  }
  const average = props.good !== 0 || props.bad !== 0 ? (props.good - props.bad) / total : 0;
  const positive = props.good !== 0 || props.bad !== 0 ? (props.good / total) * 100 : 0;

  return (
      <table>
        <tbody>
          <StatisticsLine text='Good' value={props.good} />
          <StatisticsLine text='Neutral' value={props.neutral} />
          <StatisticsLine text='Bad' value={props.bad} />
          <StatisticsLine text='Total' value={total} />
          <StatisticsLine text='Average' value={average} />
          <StatisticsLine text='Positive' value={positive + '%'} />
        </tbody>
      </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  let states = {
    goodState: good,
    neutralState: neutral,
    badState: bad,
  }

  const handleGoodClick = () => {
    setGood(good + 1)
    states.goodState = good;
  }

  
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    states.neutralState = neutral;
  }

  
  const handleBadClick = () => {
    setBad(bad + 1)
    states.badState = bad;
  }

  return (
    <div>
      <Statistics good={good} neutral={neutral} bad={bad} />
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
    </div>
  )
}

export default App