import React, { useState } from "react";
import StartingScreen from "./StartingScreen";
import GameScreen from "./GameScreen";
import EndScreen from "./EndScreen";
import "./App.css";

// Game States
const INTRO = "INTRO";
const PLAYING = "PLAYING";
const ENDED = "ENDED";

export default function App() {
  const [currentState, setCurrentState] = useState(INTRO);
  const [currentWords, setCurrentWords] = useState("");
  const [gameOutput, setGameOutput] = useState({});

  const startGame = (init) => {
    setCurrentWords(init);
    setCurrentState(PLAYING);
  };

  const onEndGame = (gameOutput) => {
    setGameOutput(gameOutput);
    setCurrentState(ENDED);
  };

  const resetGame = () => {
    setCurrentWords("");
    setGameOutput({});
    setCurrentState(INTRO);
  };

  const renderScreen = () => {
    if (currentState === INTRO) {
      return <StartingScreen startGame={startGame} />;
    }
    if (currentState === PLAYING) {
      return (
        <GameScreen
          initialWords={currentWords}
          onEndGame={onEndGame}
          reset={resetGame}
        />
      );
    }
    if (currentState === ENDED) {
      return <EndScreen reset={resetGame} gameOutput={gameOutput} />;
    }
  };

  return renderScreen();
}
