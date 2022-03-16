import { useState } from 'react';

const Display = ({ counter }) => <div>{counter}</div>;
const Button = ({ name, callback }) => <button onClick={callback}>{name}</button>
  
const App = () => {
  const [ counter, setCounter ] = useState(0);

  const clickPlusOne = () => setCounter(counter + 1);
  const clickMinusOne = () => setCounter(counter - 1);
  const clickReset = () => setCounter(0);


  return (
    <div>
      <Display counter={counter} />
      <Button name="Plus One" callback={clickPlusOne} />
      <Button name="Minus One" callback={clickMinusOne} />
      <Button name="reset" callback={clickReset} />
    </div>
  )
}

export default App