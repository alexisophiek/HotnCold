import React from 'react';
import './navigation.css';

export default function TopNavigation({onClickNewGame, onClickShowRules}) {
  return (
    <header>
    <nav>
      <ul>
        <li><button id="help-window" onClick={() => onClickShowRules()}>Help?</button></li>
        <li><button id="start-over" onClick={() => onClickNewGame()}>Start New Game</button></li>
      </ul>
    </nav>

  <h1>Guess a Number</h1>
  </header>
  );
}