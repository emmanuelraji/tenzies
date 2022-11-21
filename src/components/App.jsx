import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import Die from "./Die.jsx";

function App() {
  const [dice, setDice] = useState(generateDice());
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useState(0);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You win!!");
    }
  }, [dice]);

  function generateDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }

  function generateDice() {
    const diceArr = [];
    for (let i = 0; i < 10; i++) {
      diceArr.push(generateDie());
    }
    return diceArr;
  }

  function handleClick(id) {
    setDice((prevState) =>
      prevState.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false);
      setDice(generateDice);
      setRolls(0);
    } else {
      setRolls((prevState) => prevState + 1);
      setDice((prevState) =>
        prevState.map((die) => {
          return die.isHeld === false ? generateDie() : die;
        })
      );
    }
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      onClick={() => handleClick(die.id)}
    />
  ));

  return (
    <div className="app-container">
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-board">{diceElements}</div>
      <button onClick={rollDice} className="roll-dice">
        {!tenzies ? `Roll ${rolls}` : "New Game"}
      </button>
    </div>
  );
}

export default App;
