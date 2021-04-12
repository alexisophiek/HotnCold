import "./App.css";
import React from "react";
import BasicForm from "./form-logic";
import TopNavigation from "./navigation";
import Footer from "./footer";
import HelpWindow from "./help-window";
import GuessResult from './guess-result';
import GuessedNumbersCount from './guess-count';
import ColorArray from './color-gradient';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showGameRules: false,
      currentGuess: '',
      previousGames: {},
      guessedCorrectly: false,
      previousGuesses: [],
      guessResultOutcomes: {
        start: 'Make a Guess',
        gameWon: 'You are on Fire',
        hot: 'very Warm!',
        warmer: 'that is closer...or farther...',
        cold: 'cold!'
      },
      secretNumber: this.generateNumberToGuess(this.props.minNumber, this.props.maxNumber)
  };
} 
  setCurrentGuess(currentGuess) {
    this.setState ({currentGuess});
  }
  setShowGameRules(showGameRules){
    this.setState ({showGameRules});
  }
  setGuessedCorrectly(guessedCorrectly) {
    this.setState({guessedCorrectly});
  }
  setPreviousGuesses(previousGuesses) {
    this.setState({previousGuesses});
  }
  setGuessResultOutcomes(guessResultOutcomes) {
    this.setState({guessResultOutcomes});
  }
  setSecretNumber(secretNumber) {
    this.setState({secretNumber});
  }

  onSubmitGuessedNumber(guessedNumber) {
    // console.log('Submitted | Guessed Number:', guessedNumber);
    const showText = this.hotOrCold(this.state.secretNumber, guessedNumber);
    const guessedCorrectly = this.state.secretNumber === guessedNumber;
    const previousGuesses = [...this.state.previousGuesses, guessedNumber];
    const currentGuess = guessedNumber;
    var listLength = this.state.previousGuesses.length;
    console.log("How Many Guesses so far", listLength)
    console.log("The Number to Guess is:", this.state.secretNumber)
    this.setState({
      showText,
      guessedCorrectly,
      currentGuess,
      previousGuesses
    });
    return listLength;
  }

  generateNumberToGuess(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  onSubmitRestart() {
    this.setPreviousGuesses([]);
    this.setGuessResultOutcomes(this.state.guessResultOutcomes.start);
    this.setGuessedCorrectly(false);
    this.setSecretNumber(this.generateNumberToGuess(this.props.minNumber, this.props.maxNumber));
    this.setCurrentGuess('');
  }

  hotOrCold(secretNumber, guess) {
    if (secretNumber === guess) {
      return this.state.guessResultOutcomes.gameWon;
    }
    const howFar = Math.abs(secretNumber - guess);
    if (howFar > 10) {
      return this.state.guessResultOutcomes.cold;
    }
    if (howFar <= 10 && howFar >= 5) {
      return this.state.guessResultOutcomes.warmer;
    }
    if (howFar < 5) {
      return this.state.guessResultOutcomes.hot;
    }
  }

  render() {
    const {minNumber, maxNumber} = this.props;
    if (this.state.showGameRules) {
      return <HelpWindow onClickClose={() => this.setShowGameRules(false)} />
    }
    console.log("These are the previous guesses", this.state.previousGuesses);
    console.log("This is your current guess", this.state.currentGuess);

    return (
      <div className="App">
        {/* <AppElements /> */}
        {/* <BasicForm /> */}
        <TopNavigation onClickNewGame={() => this.onSubmitRestart()} onClickShowRules={() => this.setShowGameRules(true)}/>
        <Footer />
        <GuessResult guessResultText={this.hotOrCold.showText} />
          <BasicForm
            disableInputField={this.state.guessedCorrectly}
            onSubmit={number => this.state.guessedCorrectly ? this.onSubmitRestart() : this.onSubmitGuessedNumber(number)}
            min={minNumber}
            max={maxNumber}
          />
        <ColorArray />
        <p>Your Current Guess</p>
        {this.state.currentGuess}
        <div>All Previous Guesses <br></br> {this.state.previousGuesses}</div>
        <GuessedNumbersCount count={this.state.previousGuesses.length} />
      </div>
    );
  }
}

App.defaultProps = {
  minNumber: 1,
  maxNumber: 100
};