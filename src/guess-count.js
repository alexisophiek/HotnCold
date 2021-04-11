import React from 'react';

export default function GuessedNumbersCount({count}) {
  return (
    <p className="guessed-number-count">Guessed <span className="count">{count}</span> time(s)!</p>
  );
}