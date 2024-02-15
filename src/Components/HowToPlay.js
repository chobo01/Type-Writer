import React from "react";

function HowToPlay() {
  return (
    <div className="how-to-play">
      <h1>How To Play:</h1>
      <p>
        Type into the input and press space when you have finished writing the
        word.
      </p>
      <p>Easy contains Alphabets</p>
      <p>Normal contains one word for each of the Alphabets</p>
      <p>Hard contains words from the dictionary</p>
      <div className="menu">
        <a href="/">Back</a>
      </div>
    </div>
  );
}

export default HowToPlay;
