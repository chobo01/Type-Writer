import React from "react";

function DifficultyMenu() {
  return (
    <div className="difficulty-menu">
      <h1>Difficulties:</h1>
      <div className="menu">
        <a href="/easy">Easy</a>
        <a href="/normal">Normal</a>
        <a href="/hard">Hard</a>
        <a href="/">Back</a>
      </div>
    </div>
  );
}

export default DifficultyMenu;
