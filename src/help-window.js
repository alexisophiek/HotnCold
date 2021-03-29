import React from 'react';
// import './game-rules.css';

export default function HelpWindow({onClickClose}) {
  return (
    <div className="help-window-container">
      <div className="content">
        <h3>How Do I Play?</h3>
        <div className="rules">
          <p>This is a Hot or Cold Number Guessing Game.<br/> The game goes like this: </p>

          <button onClick={() => onClickClose()}>Got It!</button>
        </div>
      </div>
    </div>
  );
};