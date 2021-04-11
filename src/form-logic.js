import React, {useState} from "react";
// import Gradient from "javascript-color-gradient";

export default class BasicForm extends React.Component {
  onSubmit(event) {
    event.preventDefault();
    let guessedNumber = parseInt(this.textInput.value.trim(), 10);
    this.textInput.value = '';
    if (Number.isInteger(guessedNumber) || this.textInput.disabled) {
      this.props.onSubmit(guessedNumber);
    }
  } 
  render() {
    const {disableInputField, min, max, btnLabel} = this.props;

    return (
      <>
        <section>
          <p>I'm thinking of a number. Can you guess it?</p>
        </section>
        <form onSubmit={e => this.onSubmit(e)}>
        <input
          disabled={disableInputField}
          type="number"
          min={min}
          max={max}
          ref={input => this.textInput = input}
        />  
        {/* <button>{btnLabel}</button>         */}
        <input type="submit" value="Take a Guess" />
        </form>
      </>
    );
  }
}