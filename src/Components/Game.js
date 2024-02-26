// import React, { useState, useEffect } from "react";

// function Game({ words }) {
//   const url = window.location.href.split("//")[1];
//   const urlList = url.split("/");
//   const difficulty = urlList[1];
//   const [correct, setCorrect] = useState(0);
//   const [error, setError] = useState(0);
//   const [inputValue, setInputValue] = useState("");
//   const [randomWords, setRandomWords] = useState("");
//   const [wordsCharactersList, setWordsCharactersList] = useState([]);
//   const [isFirstRun, setIsFirstRun] = useState(true);
//   const [milliSeconds, setMilliSeconds] = useState(0);
//   const [hardWordsList, setHardWordsList] = useState([]);
//   const [randomIndices, setRandomIndices] = useState(Array(5).fill(0));
//   const [hardIndex, setHardIndex] = useState(0);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [colourList, setColourList] = useState([]);
//   const [isEnd, setIsEnd] = useState(false);
//   const [charactersList, setCharactersList] = useState([]);
//   const [charactersIndex, setCharactersIndex] = useState(0);
//   const [listIndex, setListIndex] = useState(0);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       // Increment the milliseconds
//       if (!isEnd) setMilliSeconds((prevMilliseconds) => prevMilliseconds + 20);
//     }, 20);

//     // Cleanup function to clear the interval when component unmounts or timer stops
//     return () => clearInterval(intervalId);
//   }, [isEnd]); // Empty dependency array ensures effect runs only once after the initial render

//   function handleChange(event) {
//     setInputValue(event.target.value.trim());
//     if (event.target.value !== " ") {
//       setCurrentIndex(currentIndex + 1);
//       let tempList = colourList;
//       if (event.target.value.length !== 0) {
//         if (
//           event.target.value[event.target.value.length - 1] ===
//           charactersList[event.target.value.length - 1]
//         ) {
//           if (colourList.length < currentIndex + 1) {
//             tempList = tempList.concat(0);
//             setColourList(tempList);
//             // } else {
//             //   tempList.splice(tempList.length - 1, 1);
//             //   setColourList(tempList);
//           }
//         } else {
//           if (colourList.length < currentIndex + 1) {
//             tempList = tempList.concat(1);
//             setColourList(tempList);
//           }
//         }
//       } else {
//         if (event.target.value === charactersList[0]) {
//           if (colourList.length < currentIndex + 1) {
//             tempList = tempList.concat(0);
//             setColourList(tempList);
//             // } else {
//             //   tempList.splice(tempList.length - 1, 1);
//             //   setColourList(tempList);
//           }
//         } else {
//           if (colourList.length < currentIndex + 1) {
//             tempList = tempList.concat(1);
//             setColourList(tempList);
//           }
//         }
//       }
//     } else {
//       setListIndex(listIndex + 1);
//       setCharactersIndex(
//         charactersIndex + wordsCharactersList[listIndex + 1].length
//       );
//       setCharactersList(wordsCharactersList[listIndex + 1]);
//     }
//   }

//   function handleKeyDown(event) {
//     if (event.key === " " && inputValue.trim() !== "") {
//       if (difficulty !== "hard") {
//         if (inputValue.trim() === words[randomIndices[0]]) {
//           setCorrect(correct + 1);
//         } else {
//           setError(error + 1);
//         }
//         randomWordGenerator();
//         setInputValue("");
//       } else {
//         if (inputValue.trim() === hardWordsList[hardIndex]) {
//           if (inputValue.trim() === hardWordsList[hardWordsList.length - 1]) {
//             setIsEnd(true);
//           }
//           setInputValue("");
//           randomWordGenerator();
//           // setCurrentIndex(currentIndex - 1);
//         }
//       }
//     } else if (event.key === " " && inputValue.trim() === "") {
//       if (difficulty !== "hard") {
//         setError(error + 1);
//         randomWordGenerator();
//       }
//       setInputValue("");
//     } else if (inputValue.length !== 0 && event.key === "Backspace") {
//       let tempList = colourList;
//       tempList.splice(tempList.length - 1, 1);
//       setColourList(tempList);
//       setCurrentIndex(currentIndex - 2);
//     }
//   }

//   function randomWordGenerator() {
//     if (isFirstRun) {
//       setIsFirstRun(false);
//       if (difficulty !== "hard") {
//         const indices = Array.from({ length: 5 }, () =>
//           Math.floor(Math.random() * words.length)
//         );
//         setRandomIndices(indices);
//         setRandomWords(indices.map((index) => words[index]).join(" "));
//       } else {
//         let tempHardWordsList =
//           words[Math.floor(Math.random() * words.length)].split(" ");
//         setHardWordsList(tempHardWordsList);
//         setRandomWords(
//           tempHardWordsList[hardIndex] +
//             " " +
//             tempHardWordsList[hardIndex + 1] +
//             " " +
//             tempHardWordsList[hardIndex + 2] +
//             " " +
//             tempHardWordsList[hardIndex + 3] +
//             " " +
//             tempHardWordsList[hardIndex + 4]
//         );
//         setCharactersIndex(
//           tempHardWordsList.map((word) => word.split(""))[listIndex].length
//         );
//         setCharactersList(
//           tempHardWordsList.map((word) => word.split(""))[listIndex]
//         );
//         setWordsCharactersList(tempHardWordsList.map((word) => word.split("")));
//       }
//     } else {
//       if (difficulty !== "hard") {
//         const newIndices = [
//           ...randomIndices.slice(1),
//           Math.floor(Math.random() * words.length),
//         ];
//         setRandomIndices(newIndices);
//         setRandomWords(newIndices.map((index) => words[index]).join(" "));
//       } else {
//         setHardIndex(hardIndex + 1);
//         setRandomWords(
//           hardWordsList.slice(hardIndex + 1, hardIndex + 6).join(" ")
//         );
//       }
//     }
//   }

//   function main() {
//     if (isFirstRun) randomWordGenerator();
//     if (difficulty !== "hard") {
//       if (milliSeconds / 1000 > 60) {
//         return (
//           <>
//             <div className="game">
//               <h2>
//                 {milliSeconds / 1000 / 60}:
//                 {milliSeconds / 10000 < 1
//                   ? `0${milliSeconds / 1000}`
//                   : milliSeconds / 1000}
//               </h2>
//               <h1>{randomWords}</h1>
//               <input
//                 type="text"
//                 value={inputValue}
//                 onChange={handleChange}
//                 onKeyDown={handleKeyDown}
//                 placeholder="Type here..."
//               />
//               <div className="menu">
//                 <a href="/difficulty-menu">Back</a>
//               </div>
//               <div className="score">
//                 <h1>Correct: {correct}</h1>
//                 <h1>Error: {error}</h1>
//               </div>
//             </div>
//           </>
//         );
//       } else {
//         return (
//           <>
//             <h1>
//               You got {correct} words correct and {error} wrong in 1 minute
//             </h1>
//             <div className="menu">
//               <a href="/difficulty-menu">Back</a>
//             </div>
//           </>
//         );
//       }
//     } else {
//       if (!isEnd) {
//         return (
//           <>
//             <div className="game">
//               <h2>
//                 {Math.floor(milliSeconds / 1000 / 60)}:
//                 {(milliSeconds / 10000) % 6 < 1
//                   ? `0${Math.floor((milliSeconds / 1000) % 60)}`
//                   : Math.floor((milliSeconds / 1000) % 60)}
//               </h2>
//               <h1>
//                 {wordsCharactersList.map((currentWordCharacters, wordIndex) => {
//                   return currentWordCharacters
//                     .map((currentCharacter, index) => {
//                       let tempIndex = 0;
//                       for (let i = 1; i <= wordIndex; i++) {
//                         tempIndex += wordsCharactersList[i - 1].length;
//                       }
//                       let colourIndex = tempIndex + 1 + index;
//                       return (
//                         <span
//                           key={wordIndex + "-" + index}
//                           style={{
//                             backgroundColor:
//                               colourList[colourIndex - 1] === 0
//                                 ? "green"
//                                 : colourList[colourIndex - 1] === 1
//                                 ? "red"
//                                 : "gray",
//                           }}
//                         >
//                           {currentCharacter}
//                         </span>
//                       );
//                     })
//                     .concat(<span key={"space-" + wordIndex}> </span>);
//                 })}
//               </h1>
//               <input
//                 type="text"
//                 value={inputValue}
//                 onChange={handleChange}
//                 onKeyDown={handleKeyDown}
//                 placeholder="Type here..."
//               />
//               <div className="menu">
//                 <a href="/difficulty-menu">Back</a>
//               </div>
//             </div>
//           </>
//         );
//       } else {
//         return (
//           <>
//             <h1>
//               Result:{" "}
//               {Math.floor(hardWordsList.length / (milliSeconds / 1000 / 60))}WPM
//             </h1>
//             <div className="menu">
//               <a href="/difficulty-menu">Back</a>
//             </div>
//           </>
//         );
//       }
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
    setInputValue(event.target.value.trim());
    if (event.target.value[event.target.value.length - 1] !== " ") {
      setCurrentIndex(currentIndex + 1);
      let tempList = colourList;
      if (event.target.value.length !== 0) {
        if (
          event.target.value[event.target.value.length - 1] ===
          wordsCharactersList[currentIndex]
        ) {
          if (colourList.length < currentIndex + 1) {
            tempList = tempList.concat(0);
            setColourList(tempList);
          }
        } else {
          if (colourList.length < currentIndex + 1) {
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
      setCurrentIndex(currentIndex - 2);
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
        setCurrentIndex(currentIndex + 1);
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
