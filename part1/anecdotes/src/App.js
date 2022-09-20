import { useState } from 'react'

const Button = ({ text, handler}) =>
  <button onClick={handler}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState(anecdotes.map(() => 0))

  const generateRandomInt = (min, max, cur) => {
    const generated = Math.floor(Math.random() * (max - min) ) + min
    return (generated !== cur ? generated : generateRandomInt(min, max, cur))
  }

  const handleNext = () => {
    setSelected(generateRandomInt(0, anecdotes.length-1, selected))
  }
  const handleVote = () => {
    const votedCopy = [...voted]
    votedCopy[selected] += 1
    setVoted(votedCopy)
  }

  return (
    <div>
      {anecdotes[selected]}
      <br/>
      has {voted[selected]} votes
      <br/>
      <Button handler={handleVote} text='vote'/>
      <Button handler={handleNext} text='next anecdote'/>
    </div>
  )
}

export default App