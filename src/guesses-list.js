import React from 'react';
// import './guessed-numbers-list.css';

export default function GuessesList({numbers}) {
  let list = '';
  if (numbers) {
    // list = numbers.map((number., index) => <li key={index}>{number}</li>);
    list = numbers.map((number, index) => <li key={index}>{number}</li>);

  }
  return (
    <ul className="guess-box">
      {list}
    </ul>
  );
};