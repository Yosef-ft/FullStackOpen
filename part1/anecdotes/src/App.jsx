import { useState } from "react";

function getRandInteger(min, max){
  return Math.floor(Math.random() * (max - min)) + min
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
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(8).fill(0))

  const handleClick = () =>{
    const randInt = getRandInteger(0, 8)
    setSelected(randInt)

  }

  const copy = [...points]
  const handleVote = () =>{
    copy[selected] += 1
    setPoints(copy)
  }


  return (
    <div>
      <h1>Anecdot of the day</h1>
      {anecdotes[selected]}<br></br>
      <p>has {points[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>next anecdotes</button>

      <h1>Anecdot with the most vote</h1>
      {anecdotes[points.findIndex(element => element === Math.max(...points))]}<br></br>
      <p>has {Math.max(...points)} votes</p>
    </div>
  )
}

export default App