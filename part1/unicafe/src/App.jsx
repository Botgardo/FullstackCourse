import { useState } from 'react'

const Button = ({handleClick, text}) => {

  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Stadistics = ({stadistics, isFeedback}) => {
  if(isFeedback){
    return(
    <div>
      <h2>Stadistics</h2>
      <table>
        <StadisticsLine text={"good"} value={stadistics.good}></StadisticsLine>
        <StadisticsLine text={"neutral"} value={stadistics.neutral}></StadisticsLine>
        <StadisticsLine text={"bad"} value={stadistics.bad}></StadisticsLine>
        <StadisticsLine text={"all"} value={stadistics.all}></StadisticsLine>
        <StadisticsLine text={"average"} value={stadistics.average}></StadisticsLine>
        <StadisticsLine text={"positive"} value={stadistics.positive}></StadisticsLine>
      </table>
    </div>
    )
  }
  return(
    <div>
      <h2>Stadistics</h2>
      <p>No feedback given</p>
    </div>
  )
}

const StadisticsLine = ({text, value}) => {
  if(text === "positive"){
    return(
      <tr>
        <td>{text}</td>
        <td>{value}%</td>
      </tr>
    )
  }
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  const [feedback, setFeedback] = useState(0)
  const stadistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    average: average,
    positive: positive,
  }

  const handleGoodClick = () => () => {
    const updateGood = good + 1
    setGood(updateGood)
    const updateAll = updateGood + neutral + bad
    setAll(updateAll)
    const updateAverage = (updateGood*1 - bad*1)/ updateAll
    setAverage(updateAverage)
    setPositive((updateGood / updateAll)*100)
    setFeedback(1)
  }

  const handleNeutralClick = () => () => {
    const updateNeutral = neutral + 1
    setNeutral(updateNeutral)
    const updateAll = good + updateNeutral + bad
    setAll(updateAll)
    const updateAverage = (good*1 - bad*1)/updateAll
    setAverage(updateAverage)
    setPositive((good / updateAll)*100)
    setFeedback(1)
  }

  const handleBadClick = () => () => {
    const updateBad = bad + 1
    setBad(updateBad)
    const updateAll = good + neutral + updateBad
    setAll(updateAll)
    const updateAverage = (good*1 - updateBad*1)/ updateAll
    setAverage(updateAverage)
    setPositive((good / updateAll)*100)
    setFeedback(1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick()} text={"Good"}></Button>
      <Button handleClick={handleNeutralClick()} text={"Neutral"}></Button>
      <Button handleClick={handleBadClick()} text={"Bad"}></Button>
      <Stadistics stadistics={stadistics} isFeedback={feedback}></Stadistics>
    </div>
  )
}

export default App