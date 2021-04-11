import React from 'react';

export default function GuessResult({guessResultText}) {
  return (
    <h2 className="guess-result">{guessResultText}</h2>
  );
}