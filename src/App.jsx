import { useState, useRef, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Die from './components/Die'
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

  const [dieNum, setDieNum] = useState(() => generateAllNewDice())
  const [count, setCount] = useState(0)
  const buttonRef = useRef(null)

  const dieElements = dieNum.map((die) => {
    return <Die key={die.id} id={die.id} value={die.value} isHeld={die.isHeld} hold={hold}/>
  })

  const handleClick = () => {
    setCount(prev => prev + 1)
    setDieNum(prev => prev.map((die) => !die.isHeld ? {...die, value: Math.ceil(Math.random() * 6)} : die))
  }

  const handle= () => {
    setDieNum(generateAllNewDice)
  }

 const gameWon = dieNum.every(die => die.isHeld) && dieNum.every(die => die.value === dieNum[0].value)

 useEffect(() => {
    if (gameWon) {
        buttonRef.current.focus()
    }
  }, [gameWon])

  return (
      <main>
        {gameWon && <Confetti />}
        <div aria-live="polite" className="sr-only">
          {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
        </div>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <h4>Count {count}</h4>
        <div className="die">
          {dieElements}
        </div>
        <button ref={buttonRef} className="rollBtn" onClick={gameWon ? handle : handleClick }>{gameWon ? "New Game" : "Roll"}</button>
      </main>
  )
}

export default App
