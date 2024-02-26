import React, { useState, useEffect } from "react";

function Game({ words }) {
  const url = window.location.href.split("//")[1];
  const urlList = url.split("/");
  const difficulty = urlList[1];
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [randomWords, setRandomWords] = useState("");
  const [wordsCharactersList, setWordsCharactersList] = useState([]);
  const [isFirstRun, setIsFirstRun] = useState(true);
  const [milliSeconds, setMilliSeconds] = useState(0);
  const [hardWordsList, setHardWordsList] = useState([]);
  const [randomIndices, setRandomIndices] = useState(Array(5).fill(0));
  const [hardWordsIndex, setHardWordsIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [colourList, setColourList] = useState([]);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Increment the milliseconds
      if (!isEnd) setMilliSeconds((prevMilliseconds) => prevMilliseconds + 20);
    }, 20);

    // Cleanup function to clear the interval when component unmounts or timer stops
    return () => clearInterval(intervalId);
  }, [isEnd]); // Empty dependency array ensures effect runs only once after the initial render

  function handleChange(event) {
    if (difficulty !== "hard") {
      setInputValue(event.target.value.trim());
    } else {
      console.log(currentIndex, event.target.value.length);
      setInputValue(event.target.value);
      let tempList = colourList;
      if (event.target.value.length !== 0) {
        if (
          event.target.value[event.target.value.length - 1] ===
          wordsCharactersList[currentIndex + event.target.value.length - 1]
        ) {
          if (colourList.length < currentIndex + event.target.value.length) {
            tempList = tempList.concat(0);
            setColourList(tempList);
          }
        } else {
          if (colourList.length < currentIndex + event.target.value.length) {
            tempList = tempList.concat(1);
            setColourList(tempList);
          }
        }
      }
    }
  }

  function handleKeyDown(event) {
    if (event.key === " " && inputValue.trim() !== "") {
      if (difficulty !== "hard") {
        if (inputValue.trim() === words[randomIndices[0]]) {
          setCorrect(correct + 1);
        } else {
          setError(error + 1);
        }
        randomWordGenerator();
        setInputValue("");
      } else {
        if (inputValue.trim() === hardWordsList[hardWordsIndex]) {
          if (inputValue.trim() === hardWordsList[hardWordsList.length - 1]) {
            setIsEnd(true);
          }
          setInputValue("");
          setCurrentIndex(currentIndex + inputValue.length);
          randomWordGenerator();
        }
      }
    } else if (event.key === " " && inputValue.trim() === "") {
      if (difficulty !== "hard") {
        setError(error + 1);
        randomWordGenerator();
      }
      setInputValue("");
    } else if (inputValue.length !== 0 && event.key === "Backspace") {
      let tempList = colourList;
      tempList.splice(tempList.length - 1, 1);
      setColourList(tempList);
    }
  }

  function randomWordGenerator() {
    if (isFirstRun) {
      setIsFirstRun(false);
      if (difficulty !== "hard") {
        const indices = Array.from({ length: 5 }, () =>
          Math.floor(Math.random() * words.length)
        );
        setRandomIndices(indices);
        setRandomWords(indices.map((index) => words[index]).join(" "));
      } else {
        let tempHardWordsList = words[Math.floor(Math.random() * words.length)];
        setHardWordsList(tempHardWordsList.split(" "));
        setWordsCharactersList(tempHardWordsList.split(""));
      }
    } else {
      if (difficulty !== "hard") {
        const newIndices = [
          ...randomIndices.slice(1),
          Math.floor(Math.random() * words.length),
        ];
        setRandomIndices(newIndices);
        setRandomWords(newIndices.map((index) => words[index]).join(" "));
      } else {
        setHardWordsIndex(hardWordsIndex + 1);
        let tempColourList = colourList;
        tempColourList = tempColourList.concat(0);
        setColourList(tempColourList);
      }
    }
  }

  function main() {
    if (isFirstRun) randomWordGenerator();
    if (difficulty !== "hard") {
      if (milliSeconds / 1000 > 60) {
        return (
          <>
            <div className="game">
              <h2>
                {milliSeconds / 1000 / 60}:
                {milliSeconds / 10000 < 1
                  ? `0${milliSeconds / 1000}`
                  : milliSeconds / 1000}
              </h2>
              <h1>{randomWords}</h1>
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
            </h1>
            <div className="menu">
              <a href="/difficulty-menu">Back</a>
            </div>
          </>
        );
      }
    } else {
      if (!isEnd) {
        return (
          <>
            <div className="game">
              <h2>
                {Math.floor(milliSeconds / 1000 / 60)}:
                {(milliSeconds / 10000) % 6 < 1
                  ? `0${Math.floor((milliSeconds / 1000) % 60)}`
                  : Math.floor((milliSeconds / 1000) % 60)}
              </h2>
              <h1>
                {wordsCharactersList.map((currentCharacter, index) => {
                  return (
                    <span
                      key={index}
                      style={{
                        backgroundColor:
                          colourList[index] === 0
                            ? "green"
                            : colourList[index] === 1
                            ? "red"
                            : "gray",
                      }}
                    >
                      {currentCharacter}
                    </span>
                  );
                })}
              </h1>
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
            </div>
          </>
        );
      } else {
        return (
          <>
            <h1>
              Result:{" "}
              {Math.floor(hardWordsList.length / (milliSeconds / 1000 / 60))}WPM
            </h1>
            <div className="menu">
              <a href="/difficulty-menu">Back</a>
            </div>
          </>
        );
      }
    }
  }

  return <>{main()}</>;
}

export default Game;
