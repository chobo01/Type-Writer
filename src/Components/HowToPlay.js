import React from "react";

function HowToPlay() {
  return (
    <div className="how-to-play">
      <h1>How To Play - Easy & Normal:</h1>
      <p>
        Type into the input and press space when you have finished writing the
        word.
      </p>
      <p>Easy gets a random alphabet from the list of alphabets.</p>
      <p>
        Normal has a list consisting of a word for each of the alphabets and
        gets a random word from the list.
      </p>
      <h1>How To Play - Hard:</h1>
      <p>
        Hard has a list of paragraphs generated from ChatGPT and gets a random
        paragraph from the list.
      </p>
      <p>
        You will have to complete the whole paragraph in order to finish the
        game. It will use the time it took you to finish the paragraph and
        calculate the WPM.
      </p>
      <p>
        As You write the paragraph, it will show you if you are correct or
        incorrect in each of the characters. When the word you have entered is
        correct and you have pressed the space bar, it will remove the input and
        keep the progress. Backspace will not reduce the progress already made
        (it will only keep the full words).
      </p>
      <p>
        Type into the input and press space when you have finished writing the
        word.
      </p>
      <div className="menu">
        <a href="/">Back</a>
      </div>
    </div>
  );
}

export default HowToPlay;
