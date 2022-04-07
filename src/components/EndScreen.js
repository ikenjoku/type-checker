import React from "react";
import "./App.css";

export default function EndScreen({ reset, gameOutput }) {
  const {
    wpm,
    accuracy,
    errorCount,
  } = gameOutput;

  return (
    <div className="container">
      <h3>
        Gross WPM: {wpm}
      </h3>
      <h3>
        Accuracy: {accuracy}%
      </h3>
      <h3>
        Error Count: {errorCount}
      </h3>
      <button onClick={reset}>Play Again</button>
    </div>
  );
}
