import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import counterReducer from './reducers/reducer'

const store = createStore(counterReducer)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = total > 0 ? (good - bad) / total : 0
  const positivePercentage = total > 0 ? (good / total) * 100 : 0

  if (total === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average.toFixed(2)} />
          <StatisticLine text="positive" value={`${positivePercentage} %`} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const { good, ok, bad } = store.getState()

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => store.dispatch({ type: 'GOOD' })} text="good" />
      <Button handleClick={() => store.dispatch({ type: 'OK' })} text="neutral" />
      <Button handleClick={() => store.dispatch({ type: 'BAD' })} text="bad" />
      <Button handleClick={() => store.dispatch({ type: 'ZERO' })} text="reset stats" />

      <Statistics good={good} neutral={ok} bad={bad} />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(<App />)
}

renderApp()
store.subscribe(renderApp)