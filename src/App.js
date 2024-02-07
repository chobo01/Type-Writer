import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import HowToPlay from "./Components/HowToPlay";
import NotFound from "./Components/NotFound";
import DifficultyMenu from "./Components/DifficultyMenu";
import GameStartMenu from "./Components/GameStartMenu";

function App() {
  return (
    <div className="type-writer">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/how-to-play" Component={HowToPlay} />
          <Route path="/difficulty-menu" Component={DifficultyMenu} />
          <Route path="/easy" Component={GameStartMenu} />
          <Route path="/normal" Component={GameStartMenu} />
          <Route path="/hard" Component={GameStartMenu} />
          <Route path="*" Component={NotFound} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
