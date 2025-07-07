import { useState } from 'react'
import { nanoid } from 'nanoid'
import Die from './components/die'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const generateAllNewDice = () => {
    const num = []
    for (let i = 0; i < 10; i++) {
      num.push({value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid()})
    }
    return num
  }

  const hold = (id) => {
  setDieNum(prev => 
    prev.map(d =>
      d.id === id ? { ...d, isHeld: !d.isHeld } : d
    ))
  }

  const [dieNum, setDieNum] = useState(generateAllNewDice)

  const dieElements = dieNum.map((die) => {
    return <Die key={die.id} id={die.id} value={die.value} isHeld={die.isHeld} hold={hold}/>
  })

  const handleClick = () => {
    setDieNum(generateAllNewDice)
  }

  return (
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="die">
          {dieElements}
        </div>
        <button className="rollBtn" onClick={handleClick}>Roll</button>
      </main>
  )
}

export default App
