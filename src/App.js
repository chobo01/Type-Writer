import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./Components/Home";
import HowToPlay from "./Components/HowToPlay";
import NotFound from "./Components/NotFound";
import DifficultyMenu from "./Components/DifficultyMenu";
import GameStartMenu from "./Components/GameStartMenu";

function App() {
  const [easyTop10Results, setEasyTop10Results] = useState([]);
  const [normalTop10Results, setNormalTop10Results] = useState([]);
  const [hardTop10Results, setHardTop10Results] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("hardData");

    if (storedData) {
      let cleanedString =
        storedData
          .replace(/\\/g, "")
          .replace(/"\[/g, "[")
          .replace(/\]"/g, "]")
          .split("]")[0] + "]";

      let dataList = JSON.parse(cleanedString);

      dataList.sort((a, b) => b.wpmResult - a.wpmResult);
      setHardTop10Results(dataList);
    }
  }, []);

  function handleSetEasyResults(top10Results) {
    setEasyTop10Results(top10Results);
  }

  function handleSetNormalResults(top10Results) {
    setNormalTop10Results(top10Results);
  }

  function handleSetHardResults(top10Results) {
    if (hardTop10Results.length < 10) {
      let tempTop10Results = hardTop10Results;
      tempTop10Results = tempTop10Results.concat(top10Results);
      tempTop10Results.sort((a, b) => b.wpmResult - a.wpmResult);
      setHardTop10Results(tempTop10Results);
      localStorage.setItem("hardData", JSON.stringify(tempTop10Results));
      alert("Data saved successfully!");
    } else {
      let lowestWPM = hardTop10Results[9].wpmResult;
      if (top10Results.wpmResult > lowestWPM) {
        let tempTop10Results = hardTop10Results;
        tempTop10Results = tempTop10Results.concat(top10Results);
        tempTop10Results.sort((a, b) => b.wpmResult - a.wpmResult);
        tempTop10Results = tempTop10Results.slice(0, -1);
        setHardTop10Results(tempTop10Results);
        localStorage.setItem("hardData", JSON.stringify(tempTop10Results));
        alert("Data saved successfully!");
      } else {
        alert("Data not saved. Too low.");
      }
    }
  }

  return (
    <div className="type-writer">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-to-play" element={<HowToPlay />} />
          <Route path="/difficulty-menu" element={<DifficultyMenu />} />
          <Route
            path="/easy"
            element={
              <GameStartMenu
                top10Results={easyTop10Results}
                handleSetResults={handleSetEasyResults}
              />
            }
          />
          <Route
            path="/normal"
            element={
              <GameStartMenu
                top10Results={normalTop10Results}
                handleSetResults={handleSetNormalResults}
              />
            }
          />
          <Route
            path="/hard"
            element={
              <GameStartMenu
                top10Results={hardTop10Results}
                handleSetResults={handleSetHardResults}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
