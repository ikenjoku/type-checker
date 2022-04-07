import React, { useState } from "react";
import useKeyPress from "../hooks/useKeyPress";
import "./App.css";

const currentTime = () => new Date().getTime();

export default function GameScreen({ initialWords, onEndGame, reset }) {
  const [leftPadding, setLeftPadding] = useState(
    new Array(20).fill(" ").join("")
  );
  const [outgoingChars, setOutgoingChars] = useState("");
  const [currentChar, setCurrentChar] = useState(initialWords.charAt(0));
  const [incomingChars, setIncomingChars] = useState(initialWords.substr(1));

  const [startTime, setStartTime] = useState();
  const [wordCount, setWordCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [wpm, setWpm] = useState(0);

  const [accuracy, setAccuracy] = useState(0);
  const [typedChars, setTypedChars] = useState("");

  useKeyPress((key) => {
    if (!startTime) {
      setStartTime(currentTime());
    }

    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;
    if (key === currentChar) {
      if (leftPadding.length > 0) {
        setLeftPadding(leftPadding.substring(1));
      }
      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);

      setCurrentChar(incomingChars.charAt(0));

      updatedIncomingChars = incomingChars.substring(1);
      if (updatedIncomingChars.length === 0 && incomingChars.length === 0) {
        onEndGame({
          wpm,
          accuracy,
          errorCount
        });
      }
      setIncomingChars(updatedIncomingChars);

      if (incomingChars.charAt(0) === " ") {
        setWordCount(wordCount + 1);
        const durationInMinutes = (currentTime() - startTime) / 60000.0;
        setWpm(((wordCount + 1) / durationInMinutes).toFixed(2));
      }
    } else {
      setErrorCount(prev => prev + 1);
    }

    const updatedTypedChars = typedChars + key;
    setTypedChars(updatedTypedChars);
    setAccuracy(
      ((updatedOutgoingChars.length * 100) / updatedTypedChars.length).toFixed(
        2
      )
    );
  });

  return (
    <div className="container">
      <p className="character">
        <span className="character-out">
          {(leftPadding + outgoingChars).slice(-20)}
        </span>
        <span className="character-current">{currentChar}</span>
        <span>{incomingChars.substr(0, 20)}</span>
      </p>
      <h3>
        WPM: {wpm} | ACC: {accuracy}%
      </h3>
      <button onClick={reset}>Cancel</button>
    </div>
  );
}
