import { useState } from 'react'

const highestVotes = (points) => {
  const keys = Object.keys(points);
  const mostVotes = points[keys[0]];
  let index = 0;
  for (let i = 0; i < keys.length; i++){
    const value = points[keys[i]];
    index = value > mostVotes ? i : index;
  }
  return index;
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const max = anecdotes.length;
  const [selected, setSelected] = useState(0)
  const [point, setPoint] = useState(
    {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
    }
  )

  const handleGetNew = () => {
    const random = Math.floor(Math.random() * max);
    setSelected(random);
  }
  
  const handleVote = () => {
    const copy = { ...point};
    copy[selected]++;
    setPoint(copy);
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {point[selected]} votes.</p>
      <button onClick={handleGetNew}>Get new anecdote</button>
      <button onClick={handleVote}>Vote</button>
      <p><b>Anecdote with most votes: </b></p>
      <p>{anecdotes[highestVotes(point)]}</p>
    </div>
  )
}

export default App