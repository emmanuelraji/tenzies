import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import Confetti from "react-confetti";
import Die from "./Die.jsx";

function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const buttonRef = useRef(null);

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  /*
  function generateAllNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
    newDice.push(generateDie());
    }
    return newDice;
  }
*/

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice() {
    if (!gameWon) {
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      setDice(generateAllNewDice());
    }
  }

  function hold(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      id={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={hold}
    />
  ));

  return (
    <main className="app-container">
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-board">{diceElements}</div>
      <button onClick={rollDice} className="roll-dice" ref={buttonElement}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;

/*
Possible Add-ons 
1. Add a timer and a roll counter to see how quickly you can win the game
2. Style thhe dice to look like real dice with pips
*/
