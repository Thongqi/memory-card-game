import "./set-difficulties.css";
import { ResetContext } from "../App";
import { useContext } from "react";

export function SetDifficulty({ setDifficulties }) {
  const { setReset, setSelected } = useContext(ResetContext);

  function handleChange(event) {
    setDifficulties(event.target.value);
    setReset(true);

    setSelected([]);

    setTimeout(() => {
      setReset(false);
    }, 1000);
  }

  return (
    <div role="group" className="buttongroup">
      <div>
        <input
          type="radio"
          name="radio"
          value="easy"
          id="easy"
          onChange={handleChange}
        ></input>
        <label htmlFor="easy">Easy</label>
      </div>

      <div>
        <input
          type="radio"
          name="radio"
          value="medium"
          id="medium"
          onChange={handleChange}
        ></input>
        <label htmlFor="medium">Medium</label>
      </div>

      <div>
        <input
          type="radio"
          name="radio"
          value="hard"
          id="hard"
          onChange={handleChange}
        ></input>
        <label htmlFor="hard">Hard</label>
      </div>

      <div>
        <input
          type="radio"
          name="radio"
          value="extreme"
          id="extreme"
          onChange={handleChange}
        ></input>
        <label htmlFor="extreme">Extreme</label>
      </div>

      <div className="slider"></div>
    </div>
  );
}
