import { useState } from 'react'
import './App.css';

const Button = ({ name, callback }) => <button onClick={callback}>{name}</button>
const Display = ({ name, count }) => <td>{name}: <span>{count}</span></td>

const Statistics = (props) => {
  return (
    <table>
      <tbody>
        <tr><Display name="good" count={props.good} /></tr>
        <tr><Display name="neutral" count={props.neutral} /></tr>
        <tr><Display name="bad" count={props.bad} /></tr>
        <tr><Display name="total" count={props.total} /></tr>
        <tr><Display name="average vote" count={props.avg} /></tr>
        <tr><Display name="% positive" count={props.positive} /></tr>
      </tbody>
    </table>
  )
}

const App = () => {
  const [ good, setGood ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);
  const [ history, setHistory ] = useState([]);

  const calcAvg = () => {
    let calc = history.reduce((acc, cv) => acc + cv, 0) / history.length;

    if (!Number.isNaN(calc)) {
      return calc;
    } else {
      return null;
    }
  }

  const calcPositive = () => {
    let positive = history.filter(value => value === 1);
    let total = history.length;
    let calc = positive.length / total;
    
    if (!Number.isNaN(calc)) {
      return `${calc * 100} %`;
    } else {
      return null;
    }
  }
  
  const calcStats = () => {
    if (history.length === 1) {
      document.getElementById('emptyMsg').classList.add('hideView');
      document.getElementById('results').classList.remove('hideView');    
    }

    return {
      good: good,
      neutral: neutral,
      bad: bad,
      total: history.length,
      avg: calcAvg(),
      positive: calcPositive(),
    }
  }

  const handleClick = (event) => {
    let clicked = event.target.textContent;
    if (clicked === 'good') {
      setHistory(history.concat([1]));
      setGood(good + 1);
    } else if (clicked === 'neutral') {
      setHistory(history.concat([0]));
      setNeutral(neutral + 1);
    } else if (clicked === 'bad') {
      setHistory(history.concat([-1]));
      setBad(bad + 1);
    }
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <div className="buttons">
        <Button name="good" callback={handleClick} />
        <Button name="neutral" callback={handleClick} />
        <Button name="bad" callback={handleClick} />
      </div>
      <h2>Statistics:</h2>
      <div className="stats">
        <p id="emptyMsg">No feedback yet</p>
        <div id="results" className="hideView">
          <Statistics {...calcStats()}/>
        </div>
        
      </div>
    </div>
  )
}

export default App;
