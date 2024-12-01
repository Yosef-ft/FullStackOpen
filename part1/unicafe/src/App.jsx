import { useTransition } from "react";
import { useState  } from "react";

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) =>{
  if (props.text === "positive"){
    return(
      <tr> 
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </tr>
    )
  }
  return( 
          <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr> 
  )
}

const Statistics = (props) => {

  if (props.value.all === 0){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.value.good} />
        <StatisticLine text="neutral" value={props.value.neutral} />
        <StatisticLine text="bad" value={props.value.bad} />
        <StatisticLine text="all" value={props.value.all} />
        <StatisticLine text="average" value={props.value.average} />
        <StatisticLine text="positive" value={props.value.positive} />
      </tbody>
    </table>

  );
}

const App = () =>{
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGood = () =>{
    const updateGood = good + 1
    console.log(updateGood)
    setGood(updateGood)
    const updateAll = all + 1
    setAll(updateAll)

    const UpdateAverage = (updateGood - bad) / updateAll
    setAverage(UpdateAverage)    
  }

  const handleBad = () =>{
    const updateBad = bad + 1
    setBad(updateBad)
    const updateAll = all  + 1
    setAll(updateAll)
    const UpdateAverage = (good - updateBad) / updateAll
    setAverage(UpdateAverage)    
  }

  const handleNeutral = () =>{
    setNeutral(neutral + 1)
    const updateAll = all + 1
    setAll(updateAll)   
  }


  return(
    <div>
      <h1>Give good feedback</h1>

      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />

      <h1>Statistics</h1>
      <Statistics value={{"good": good, "neutral": neutral, "bad": bad, "all": all, "average": average, "positive": (good / all) * 100}} />


    </div>
  )
}

export default App