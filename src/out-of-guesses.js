import React from "react";

class OutOfGuesses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guessCount: 0,
      guessMax: 10,
      newGameMessage:
        "You are out of guesses. Start a New Game to continue playing.",
    };
  }
  render() {
    const guessCount = this.props.guessCount;
    const guessMaxCount = this.props.guessMaxCount;
    if (guessCount > guessMaxCount) {
      return <h2>{this.state.newGameMessage}</h2>;
    } else {
      return null;
    }
  }
}

export default OutOfGuesses;
