// import React, { useState, useEffect } from "react";

// function Game({ words }) {
//   const url = window.location.href.split("//")[1];
//   const urlList = url.split("/");
//   const difficulty = urlList[1];
//   const [correct, setCorrect] = useState(0);
//   const [error, setError] = useState(0);
//   const [inputValue, setInputValue] = useState("");
//   const [randomWord, setRandomWord] = useState("");
//   const [isFirstRun, setIsFirstRun] = useState(true);
//   const [seconds, setSeconds] = useState(0);

//   var hardWordsList = [];

//   var hardIndex = 0;
//   var randomIndex1 = 0;
//   var randomIndex2 = 0;
//   var randomIndex3 = 0;
//   var randomIndex4 = 0;
//   var randomIndex5 = 0;

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       // Increment the seconds
//       setSeconds((prevSeconds) => prevSeconds + 1);
//     }, 1000); // 1000 milliseconds = 1 second

//     // Cleanup function to clear the interval when component unmounts or timer stops
//     return () => clearInterval(intervalId);
//   }, []); // Empty dependency array ensures effect runs only once after the initial render

//   function handleChange(event) {
//     setInputValue(event.target.value);
//   }

//   function handleKeyDown(event) {
//     if (event.key === " " && inputValue.trim() !== "") {
//       if (difficulty !== "hard") {
//         if (inputValue.trim() === words[randomIndex1]) {
//           setCorrect(correct + 1);
//         } else {
//           setError(error + 1);
//         }
//         randomWordGenerator();
//       } else {
//       }
//       setInputValue("");
//     } else if (event.key === " " && inputValue.trim() === "") {
//       setError(error + 1);
//       setInputValue("");
//       randomWordGenerator();
//     }
//   }

//   function randomWordGenerator() {
//     if (isFirstRun) {
//       setIsFirstRun(false);
//       if (difficulty !== "hard") {
//         randomIndex1 = Math.floor(Math.random() * words.length);
//         randomIndex2 = Math.floor(Math.random() * words.length);
//         randomIndex3 = Math.floor(Math.random() * words.length);
//         randomIndex4 = Math.floor(Math.random() * words.length);
//         randomIndex5 = Math.floor(Math.random() * words.length);

//         setRandomWord(
//           words[randomIndex1] +
//             " " +
//             words[randomIndex2] +
//             " " +
//             words[randomIndex3] +
//             " " +
//             words[randomIndex4] +
//             " " +
//             words[randomIndex5]
//         );
//       } else {
//         hardWordsList = words.split(" ");
//         setRandomWord(
//           hardWordsList[hardIndex] +
//             " " +
//             hardWordsList[hardIndex + 1] +
//             " " +
//             hardWordsList[hardIndex + 2] +
//             " " +
//             hardWordsList[hardIndex + 3] +
//             " " +
//             hardWordsList[hardIndex + 4]
//         );
//       }
//     } else {
//       if (difficulty !== "hard") {
//         randomIndex1 = randomIndex2;
//         randomIndex2 = randomIndex3;
//         randomIndex3 = randomIndex4;
//         randomIndex4 = randomIndex5;
//         randomIndex5 = Math.floor(Math.random() * words.length);

//         setRandomWord(
//           words[randomIndex1] +
//             " " +
//             words[randomIndex2] +
//             " " +
//             words[randomIndex3] +
//             " " +
//             words[randomIndex4] +
//             " " +
//             words[randomIndex5]
//         );
//       } else {
//         hardIndex++;
//         setRandomWord(
//           hardWordsList[hardIndex] +
//             " " +
//             hardWordsList[hardIndex + 1] +
//             " " +
//             hardWordsList[hardIndex + 2] +
//             " " +
//             hardWordsList[hardIndex + 3] +
//             " " +
//             hardWordsList[hardIndex + 4]
//         );
//       }
//     }
//   }

//   function main() {
//     if (seconds < 60) {
//       return (
//         <>
//           <div className="game">
//             {isFirstRun ? randomWordGenerator() : ""}
//             <h1>0:{seconds / 10 < 1 ? `0${seconds}` : seconds}</h1>
//             <h1>{randomWord}</h1>
//             <input
//               type="text"
//               value={inputValue}
//               onChange={handleChange}
//               onKeyDown={handleKeyDown}
//               placeholder="Type here..."
//             />
//             <div className="menu">
//               <a href="/difficulty-menu">Back</a>
//             </div>
//             <div className="score">
//               <h1>Correct: {correct}</h1>
//               <h1>Error: {error}</h1>
//             </div>
//           </div>
//         </>
//       );
//     } else {
//       return (
//         <>
//           <h1>
//             You got {correct} words correct and {error} wrong in 1 minute
//           </h1>
//           <div className="menu">
//             <a href="/difficulty-menu">Back</a>
//           </div>
//         </>
//       );
//     }
//   }

//   return <>{main()}</>;
// }

// export default Game;

import React, { useState, useEffect } from "react";

function Game({ words }) {
  const url = window.location.href.split("//")[1];
  const urlList = url.split("/");
  const difficulty = urlList[1];
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [randomWord, setRandomWord] = useState("");
  const [isFirstRun, setIsFirstRun] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [hardWordsList, setHardWordsList] = useState([]);
  const [randomIndices, setRandomIndices] = useState(Array(5).fill(0));
  const [hardIndex, setHardIndex] = useState(0);

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
      if (difficulty !== "hard") {
        if (inputValue.trim() === words[randomIndices[0]]) {
          setCorrect(correct + 1);
        } else {
          setError(error + 1);
        }
        randomWordGenerator();
      } else {
        console.log(inputValue.trim(), hardWordsList[hardIndex], hardIndex);
        if (inputValue.trim() === hardWordsList[hardIndex]) {
          setCorrect(correct + 1);
        } else {
          setError(error + 1);
        }
        randomWordGenerator();
      }
      setInputValue("");
    } else if (event.key === " " && inputValue.trim() === "") {
      setError(error + 1);
      setInputValue("");
      randomWordGenerator();
    }
  }

  function randomWordGenerator() {
    console.log(isFirstRun);
    if (isFirstRun) {
      setIsFirstRun(false);
      if (difficulty !== "hard") {
        const indices = Array.from({ length: 5 }, () =>
          Math.floor(Math.random() * words.length)
        );
        setRandomIndices(indices);
        setRandomWord(indices.map((index) => words[index]).join(" "));
      } else {
        let tempHardWordsList =
          words[Math.floor(Math.random() * words.length)].split(" ");
        setHardWordsList(tempHardWordsList);
        setRandomWord(
          tempHardWordsList[hardIndex] +
            " " +
            tempHardWordsList[hardIndex + 1] +
            " " +
            tempHardWordsList[hardIndex + 2] +
            " " +
            tempHardWordsList[hardIndex + 3] +
            " " +
            tempHardWordsList[hardIndex + 4]
        );
      }
    } else {
      if (difficulty !== "hard") {
        const newIndices = [
          ...randomIndices.slice(1),
          Math.floor(Math.random() * words.length),
        ];
        setRandomIndices(newIndices);
        setRandomWord(newIndices.map((index) => words[index]).join(" "));
      } else {
        setHardIndex(hardIndex + 1);
        setRandomWord(
          hardWordsList.slice(hardIndex + 1, hardIndex + 6).join(" ")
        );
      }
    }
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
