import React from "react";

export default class BasicForm extends React.Component {
  onSubmit(event) {
    event.preventDefault();
    let guessedNumber = parseInt(this.textInput.value.trim(), 10);
    this.textInput.value = "";
    if (Number.isInteger(guessedNumber) || this.textInput.disabled) {
      this.props.onSubmit(guessedNumber);
    }
  }
  render() {
    const {
      disableInputField,
      min,
      max,
      guessCount,
      guessMaxCount,
    } = this.props;
    if (guessCount > guessMaxCount) {
      return (
        <>
          <section>
            <h2>
              You are out of guesses. Start a New Game to continue playing.
            </h2>
          </section>
          <form onSubmit={(e) => this.onSubmit(e)}>
            <input
              disabled={true}
              type="number"
              name="guess"
              min={min}
              max={max}
              ref={(input) => (this.textInput = input)}
            />
            <input type="submit" value="Take a Guess" disabled={true} />
          </form>
        </>
      );
    } else {
      return (
        <>
          <section>
            <p>I'm thinking of a number between 1 and 100. Can you guess it?</p>
          </section>
          <form onSubmit={(e) => this.onSubmit(e)}>
            <input
              disabled={disableInputField}
              type="number"
              name="guess"
              min={min}
              max={max}
              ref={(input) => (this.textInput = input)}
            />
            <input type="submit" value="Take a Guess" disabled={disableInputField} />
          </form>
        </>
      );
    }
  }
}
