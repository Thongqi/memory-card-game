// import { useState } from "react";

import { createContext, useState } from "react";
import "./App.css";
import { DisplayCard } from "./components/display-card";
import { SetDifficulty } from "./components/set-difficulties";

export const ResetContext = createContext(null);

function App() {
  const [selected, setSelected] = useState([]);
  const [highestScore, setHighestScore] = useState("0");
  const [difficulties, setDifficulties] = useState("easy");
  const [reset, setReset] = useState(false);

  const obj = {
    selected,
    setSelected,
    highestScore,
    setHighestScore,
    difficulties,
  };

  return (
    <>
      <title>Memory Card Game</title>
      <h1>Don’t Forget the Dog! &#128062;</h1>
      <ResetContext value={{ reset, setReset, setSelected }}>
        <SetDifficulty setDifficulties={setDifficulties}></SetDifficulty>
        <div>
          <p>Highest Record: {highestScore} </p>
          <p style={{ fontSize: "1.2rem", fontWeight: "500" }}>
            Your score: {selected.length}
          </p>
        </div>
        <DisplayCard {...obj}></DisplayCard>
      </ResetContext>
    </>
  );
}

export default App;
