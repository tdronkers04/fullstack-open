import { useState  } from "react";

const Button = ({ name, callback }) => <button onClick={callback}>{name}</button>
const Display = (props) => <div>{props.value}</div>

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        No history. Click a button...
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}


const AppC = () => {
  const [ left, setLeft ] = useState(0);
  const [ right, setRight ] = useState(0);
  const [ allClicks, setAll ] = useState([]);

  const handleClick = (event) => {
    if (event.target.textContent === 'left') {
      setAll(allClicks.concat(['L']));
      setLeft(left + 1);
    } else if (event.target.textContent === 'right') {
      setAll(allClicks.concat(['R']));
      setRight(right + 1);
    }
  }

  const handleReset = () => {
    setAll([]);
    setLeft(0);
    setRight(0);
  }

  return (
    <div>
      <div id="container">
        <Display value={left} />
        <Button name="left" callback={handleClick} />
        <Button name="right" callback={handleClick} />
        <Display value={right} />
      </div>
      <History allClicks={allClicks}/>
      <button onClick={handleReset}>reset</button>
    </div>
  )

}

export default AppC;