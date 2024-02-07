import React, { useState } from "react";
import Game from "./Game";

function GameStartMenu() {
  const url = window.location.href.split("//")[1];
  const urlList = url.split("/");
  const difficulty = urlList[1];
  const [isFirstRun, setIsFirstRun] = useState(true);
  const [testingWordList, setTestingWordList] = useState([]);
  const easyWordList = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const normalWordList = [
    "Apple",
    "Banana",
    "Cat",
    "Dog",
    "Elephant",
    "Fish",
    "Giraffe",
    "Hat",
    "Island",
    "Jam",
    "Kite",
    "Lion",
    "Monkey",
    "Nest",
    "Orange",
    "Pizza",
    "Queen",
    "Rabbit",
    "Sun",
    "Turtle",
    "Umbrella",
    "Violin",
    "Whale",
    "Xylophone",
    "Yellow",
    "Zebra",
  ];

  const hardWordList = [
    "Apple",
    "Banana",
    "Cat",
    "Dog",
    "Elephant",
    "Fish",
    "Giraffe",
    "Hat",
    "Island",
    "Jam",
    "Kite",
    "Lion",
    "Monkey",
    "Nest",
    "Orange",
    "Pizza",
    "Queen",
    "Rabbit",
    "Sun",
    "Turtle",
    "Umbrella",
    "Violin",
    "Whale",
    "Xylophone",
    "Yellow",
    "Zebra",
  ];

  function settingTestingWordList() {
    console.log(isFirstRun);
    if (isFirstRun) {
      if (difficulty === "easy") setTestingWordList(easyWordList);
      else if (difficulty === "normal") setTestingWordList(normalWordList);
      else if (difficulty === "hard") setTestingWordList(hardWordList);
      setIsFirstRun(false);
    }
  }

  function main() {
    if (urlList[2] === null || urlList[2] === undefined) {
      return (
        <div className="game-start-menu">
          <h1>Game Start</h1>
          <div className="menu">
            <a role="button" href={`/${difficulty}/#`}>
              Start
            </a>
            <a href="/difficulty-menu">Back</a>
            {console.log(testingWordList)}
          </div>
        </div>
      );
    } else if (urlList[2] === "#") {
      return <Game words={testingWordList} />;
    } else {
      return (
        <>
          <h1>Sorry Something Went Wrong</h1>
          <div className="menu">
            <a href="/difficulty-menu">Back</a>
          </div>
        </>
      );
    }
  }

  return (
    <>
      {settingTestingWordList()}
      {main()}
    </>
  );
}

export default GameStartMenu;
