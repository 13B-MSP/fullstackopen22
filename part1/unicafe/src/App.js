import { useState } from 'react'

const Button = ({ handleClick, text}) =>
    <button onClick={handleClick}>{text}</button>

const StatisticsLine = ({ text, value }) =>
  <>{text}: {value}<br/></>

const Statistics = ({ goodAmount, neutralAmount, badAmount }) => {
  const totalAmount = goodAmount + neutralAmount + badAmount
  const average = (goodAmount + (badAmount * -1)) / totalAmount
  const positivePerc = (goodAmount / totalAmount) * 100
  if (totalAmount > 0) {
    return <>
      <StatisticsLine text='Good' value={goodAmount}/>
      <StatisticsLine text='Neutral' value={neutralAmount}/>
      <StatisticsLine text='Bad' value={badAmount}/>
      <StatisticsLine text='All' value={totalAmount}/>
      <StatisticsLine text='Average' value={average}/>
      <StatisticsLine text='Positive' value={positivePerc + '%'}/>
    </>
  } else {
    return <>
      No feedback given
    </>
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodButtonClick = () => {
    setGood(good +1)
  }
  const handleNeutralButtonClick = () => {
    setNeutral(neutral +1)
  }
  const handleBadButtonClick = () => {
    setBad(bad +1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodButtonClick} text='Good'/>
      <Button handleClick={handleNeutralButtonClick} text='Neutral'/>
      <Button handleClick={handleBadButtonClick} text='Bad'/>
      <h1>Statistics</h1>
      <Statistics goodAmount={good} neutralAmount={neutral} badAmount={bad}/>
    </div>
  )
}

export default App