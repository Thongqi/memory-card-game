// import { useState } from "react";

import { useState } from "react";
import "./App.css";
import { DisplayCard } from "./components/display-card";

function App() {
  const [selected, setSelected] = useState([])
  const [highestScore, setHighestScore] = useState("0")

  const obj = {selected, setSelected, highestScore, setHighestScore}

  return (
    <>
      <div>
            <p>Highest Record: {highestScore} </p>
            <p>Your score: {selected.length}</p>
      </div>
      <DisplayCard {...obj}></DisplayCard>
    </>
  );
}

export default App;
