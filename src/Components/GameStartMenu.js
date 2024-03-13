// import React, { useState, useEffect } from "react";
import React, { useState } from "react";
import Game from "./Game";

function GameStartMenu({ top10Results, handleSetResults }) {
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
    "'Life is what happens when you're busy making other plans,' said John Lennon, " +
      "encapsulating the unpredictable essence of existence. In the tapestry of our lives, " +
      "woven with threads of hope and despair, moments flicker like stars in the night sky, " +
      "illuminating our journey. Every decision, every action, shapes our narrative.",

    "'The only way to do great work is to love what you do,' remarked Steve Jobs, a " +
      "beacon of innovation and passion. These words echo the profound truth that " +
      "genuine dedication births excellence. Amidst the cacophony of expectations, " +
      "finding one's true calling becomes paramount, a compass guiding through turbulent seas.",

    "'Two roads diverged in a wood, and I - I took the one less traveled by, and that has " +
      "made all the difference,' mused Robert Frost, contemplating life's divergent paths. " +
      "The choices we make, the risks we undertake, carve the contours of our destiny. " +
      "Each step forward unfurls a new chapter, laden with possibilities.",

    "'The only limit to our realization of tomorrow will be our doubts of today,' " +
      "proclaimed Franklin D. Roosevelt, urging us to cast aside the shackles of " +
      "uncertainty. In the crucible of adversity, resilience emerges as our staunchest ally, " +
      "fortifying our resolve. Embracing the unknown, we embark on a voyage of self-discovery.",

    "'To be yourself in a world that is constantly trying to make you something else is the " +
      "greatest accomplishment,' opined Ralph Waldo Emerson, championing " +
      "authenticity amidst conformity's clamor. In a society awash with expectations, " +
      "embracing one's uniqueness becomes an act of defiance, a rebellion against homogeneity.",

    "'The purpose of our lives is to be happy,' asserted the Dalai Lama, distilling the " +
      "essence of human existence into a singular pursuit. Beneath the tumult of desires " +
      "and obligations, lies the quest for fulfillment, a quest as old as time itself. Amidst " +
      "life's labyrinth, happiness emerges as our guiding star.",

    "'Success is not final, failure is not fatal: It is the courage to continue that counts,' " +
      "declared Winston Churchill, epitomizing the indomitable spirit of perseverance. In " +
      "the crucible of trials, triumphs, and tribulations, courage emerges as our staunchest " +
      "ally, propelling us forward against all odds.",

    "'In the end, it's not the years in your life that count. It's the life in your years,' " +
      "reflected Abraham Lincoln, pondering the legacy of existence. Beyond the " +
      "ephemeral constraints of time lies the enduring legacy of impact, etched into the " +
      "annals of history by deeds profound and poignant.",

    "'The greatest glory in living lies not in never falling, but in rising every time we fall,' " +
      "proclaimed Nelson Mandela, embodying the resilience of the human spirit. In the " +
      "crucible of adversity, character is forged, tempered by the fires of struggle. With " +
      "each stumble, we ascend higher, our spirit unyielding.",

    "'Happiness is not something ready-made. It comes from your own actions,' " +
      "articulated the Dalai Lama, extolling the transformative power of choice. Amidst " +
      "life's tumultuous currents, happiness emerges not as a destination, but as a journey " +
      "- a tapestry woven with threads of purpose, passion, and resilience.",
  ];

  // useEffect(() => {
  //   const fetchWords = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://api.wordnik.com/v4/words.json/randomWords" +
  //           "?hasDictionaryDef=true&minCorpusCount=1000&minLength=5&maxLength=10&limit=10&api_key=YOUR_WORDNIK_API_KEY"
  //       );
  //       console.log(response.data.map((wordObj) => wordObj.word));
  //       setHardWordList(response.data.map((wordObj) => wordObj.word));
  //     } catch (error) {
  //       console.error("Error fetching words:", error);
  //     }
  //   };

  //   async function settingTestingWordList() {
  //     if (isFirstRun) {
  //       if (difficulty === "easy") setTestingWordList(easyWordList);
  //       else if (difficulty === "normal") setTestingWordList(normalWordList);
  //       else if (difficulty === "hard") {
  //         fetchWords();
  //         setTestingWordList(hardWordList);
  //       }
  //       setIsFirstRun(false);
  //     }
  //   }

  //   settingTestingWordList();
  // }, [difficulty, easyWordList, hardWordList, isFirstRun, normalWordList]);

  function settingTestingWordList() {
    if (isFirstRun) {
      if (difficulty === "easy") setTestingWordList(easyWordList);
      else if (difficulty === "normal") setTestingWordList(normalWordList);
      else if (difficulty === "hard") setTestingWordList(hardWordList);
      setIsFirstRun(false);
    }
  }

  function handleSetResultsInMenu(result) {
    handleSetResults(result);
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
          </div>
        </div>
      );
    } else if (urlList[2] === "#") {
      return (
        <Game
          words={testingWordList}
          top10Results={top10Results}
          handleSetResults={handleSetResultsInMenu}
        />
      );
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
      {main()}
      {settingTestingWordList()}
    </>
  );
}

export default GameStartMenu;
