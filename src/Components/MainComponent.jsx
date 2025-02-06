import React, { useEffect, useState } from "react";
import "../CSS/MainComponent.css";

const randomColorGenerator = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};

export default function MainComponent() {
  const [targetColor, setTargetColor] = useState("#ffffff");
  const [colorOption, setColorOption] = useState([]);
  const [gameStatus, setGameStatus] = useState("");
  const [gameScore, setGameScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);

  const startGame = () => {
    const newTargetColor = randomColorGenerator();
    const option = [
      newTargetColor,
      randomColorGenerator(),
      randomColorGenerator(),
      randomColorGenerator(),
      randomColorGenerator(),
      randomColorGenerator(),
    ].sort(() => 0.5 - Math.random());
    setTargetColor(newTargetColor);
    setColorOption(option);
    setGameStatus("");
    setIsCorrect(null);
  };

  useEffect(() => {
    startGame();
  }, []);

  const handleGuess = (color) => {
    if (color === targetColor) {
      setGameStatus("Correct 😃 👏 👏");
      setGameScore(gameScore + 1);
      setIsCorrect(true);
      setTimeout(startGame, 1000);
    } else {
      setGameStatus("Wrong Guess, try again 😥");
      setIsCorrect(false);
    }
  };

  const handleNewGame = () => {
    setGameScore(0);
    startGame();
  };

  return (
    <div className="body">
      <div className="body-content">
        <h2 data-testid="gameInstructions">Can you guess the right Color?</h2>
        <div className="score-and-cancel-button">
          <p data-testid="score">Score: {gameScore} </p>
          <button
            className="cancelBtn"
            data-testid="newGameButton"
            onClick={() => handleNewGame()}
          >
            New game
          </button>
        </div>
        <span data-testid="gameStatus">{gameStatus}</span>
        <div
          className="box"
          data-testid="colorBox"
          style={{ backgroundColor: targetColor }}
        ></div>
        <div className="colorOptions">
          {colorOption.map((color, index) => (
            <button
              data-testid="colorOption"
              key={index}
              style={{ backgroundColor: color }}
              onClick={() => handleGuess(color)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
