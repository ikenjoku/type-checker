import React, { useEffect } from "react";
import { generateWords } from "../utils/generator";
import "./App.css";

export default function StartingScreen({ startGame }) {
  const [currentWords, setCurrentWords] = React.useState("");

  useEffect(() => {
    async function getWords() {
      const words = await generateWords();
      setCurrentWords(words.join(" "));
    }
    getWords();
  }, []);
  return (
    <div className="container">
        <div>Welcome to <strong>Type Checker</strong></div>
        <p className="highlight">Please click start to play</p>
        <button onClick={() => startGame(currentWords)}>Start Game</button>
    </div>
  )
}
