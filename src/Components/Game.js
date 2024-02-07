import React, { useState, useEffect } from "react";

function Game({ words }) {
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [randomWord, setRandomWord] = useState("");
  const [isFirstRun, setIsFirstRun] = useState(true);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Increment the seconds
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000); // 1000 milliseconds = 1 second

    // Cleanup function to clear the interval when component unmounts or timer stops
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures effect runs only once after the initial render

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === " " && inputValue.trim() !== "") {
      if (inputValue.trim() === randomWord) {
        setCorrect(correct + 1);
      } else {
        setError(error + 1);
      }
      setInputValue("");
      randomWordGenerator();
    } else if (event.key === " " && inputValue.trim() === "") {
      setError(error + 1);
      setInputValue("");
      randomWordGenerator();
    }
  }

  function randomWordGenerator() {
    if (isFirstRun) setIsFirstRun(false);
    const randomIndex = Math.floor(Math.random() * words.length);
    setRandomWord(words[randomIndex]);
  }

  function main() {
    if (seconds < 60) {
      return (
        <>
          <div className="game">
            {isFirstRun ? randomWordGenerator() : ""}
            <h1>0:{seconds / 10 < 1 ? `0${seconds}` : seconds}</h1>
            <h1>{randomWord}</h1>
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Type here..."
            />
            <div className="menu">
              <a href="/difficulty-menu">Back</a>
            </div>
            <div className="score">
              <h1>Correct: {correct}</h1>
              <h1>Error: {error}</h1>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <h1>
            You got {correct} words correct and {error} wrong in 1 minute
            wdsfsdfs
          </h1>
          <div className="menu">
            <a href="/difficulty-menu">Back</a>
          </div>
        </>
      );
    }
  }

  return <>{main()}</>;
}

export default Game;
