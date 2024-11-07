import { useState } from 'react'

const Statistics = ({ good, neutral, bad, total, average, positivePercentage }) => {
  return (
    <div>
      <h2>Statistics</h2>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <div>
          <p>good {good}</p>
          <p>neutral {neutral}</p>
          <p>bad {bad}</p>
          <p>all {total}</p>
          <p>average {average}</p>
          <p>positive {positivePercentage} %</p>
        </div>
      )}
    </div>
  )
}

const App = () => {
  // Save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  // Calculations for additional statistics
  const total = good + neutral + bad
  const average = total > 0 ? (good - bad) / total : 0
  const positivePercentage = total > 0 ? (good / total) * 100 : 0

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positivePercentage={positivePercentage}
      />
    </div>
  )
}

export default App