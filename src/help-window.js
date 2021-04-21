import React from 'react';
import './help-window.css';

export default function HelpWindow({onClickClose}) {
  return (
    <div className="help-window-container">
      <div className="content">
        <h3>How Do I Play?</h3>
        <div className="rules">
          <p>This is a "Hot or Cold? Number Guessing Game. The game goes like this: </p>
          <ul>
            <li>You have ten attempts available to guess the right number.</li>
            <li>After you take a guess, we will tell you if you are hot or cold.</li>
            <li>After ten attempts, you will be asked to start a New Game.</li>
          </ul>

          <button onClick={() => onClickClose()}>Ok</button>
        </div>
      </div>
    </div>
  );
}