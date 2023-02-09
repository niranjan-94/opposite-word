import React, { useState } from 'react';
import './App.css';

const words = [
  { word: 'hot', opposite: 'cold' },
  { word: 'fast', opposite: 'slow' },
  { word: 'up', opposite: 'down' },
  { word: 'big', opposite: 'small' },
];

function App() {
  const [wordIndex, setWordIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  const currentWord = words[wordIndex];
  const options = [currentWord.opposite, words[(wordIndex + 1) % words.length].opposite];
  const shuffledOptions = options.sort(() => Math.random() - 0.5);

  function handleOptionClick(option) {
    setSelectedOption(option);
    if (option === currentWord.opposite) {
      setTimeout(() => {
        setWordIndex((wordIndex + 1) % words.length);
        setSelectedOption(null);
        setShowWarning(false);
      }, 1000);
    } else {
      setShowWarning(true);
    }
  }

  function handleResetClick() {
    setSelectedOption(null);
    setShowWarning(false);
  }

  return (
    <div className="word-container">
      <div className="word">{currentWord.word}</div>
      <div className="options-container">
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            className={`option ${selectedOption === option && selectedOption === currentWord.opposite
              ? 'correct'
              : selectedOption === option && selectedOption !== currentWord.opposite
              ? 'incorrect'
              : ''}`}
            onClick={() => handleOptionClick(option)}
            disabled={selectedOption !== null}
          >
            {option}
          </button>
        ))}
      </div>
      {showWarning && (
        <div className="warning-container">
          <div className="warning">
            Incorrect! The correct answer is "{currentWord.opposite}"
          </div>
          <button className="reset-button" onClick={handleResetClick}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
