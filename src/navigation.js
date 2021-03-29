import React from 'react';
import './navigation.css';
import HelpWindow from "./help-window"


export default function TopNavigation({onClickNewGame, onClickShowRules}) {
  return (
    <header>
    <nav>
      <ul>
        <li><button id="help-window" onClick={() => onClickShowRules()}>Help?</button></li>
        <li><button id="start-over" onClick={() => onClickNewGame()}>Start New Game</button></li>
      </ul>
    </nav>

  <h1>Are you Hot or Cold?</h1>
  </header>
  );
}