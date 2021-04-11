import "./App.css";
import React from "react";
import BasicForm from "./form-logic";
import TopNavigation from "./navigation";
import Footer from "./footer";
// import HelpWindow from "./help-window";
import GuessResult from './guess-result';
import GuessesList from './guesses-list';
import GuessedNumbersCount from './guess-count';

// useState and useEffect?
class AppElements extends React.Component {
  render() {
    return (
      <>
        <TopNavigation onClickNewGame={() => this.onSubmitRestart()} onClickShowRules={() => this.setShowGameRules(true)} />
        <Footer />
      </>
    );
  }
}

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
        cold: 'brrrr...cold!'
      },
      correctAnswer: this.generateNumberToGuess(this.props.minNumber, this.props.maxNumber)
  };
} 

  setShowGameRules(showGameRules ){
    this.setState ({showGameRules});
  }
  setGuessedCorrectly(guessedCorrectly) {
    this.setState({guessedCorrectly});
  }
  setGuessedNumbers(guessedNumbers) {
    this.setState({guessedNumbers});
  }
  setGuessMessageText(guessMessageText) {
    this.setState({guessMessageText});
  }
  setSecretNumber(secretNumber) {
    this.setState({secretNumber});
  }

  onSubmitGuessedNumber(guessedNumber) {
    console.log('Submit Test | Guessed Number:', this.state.secretNumber);
    const guessMessageText = this.hotOrCold(this.state.secretNumber, guessedNumber);
    const guessedCorrectly = this.state.secretNumber === guessedNumber;
    const guessedNumbers = [this.state.guessedNumbers, guessedNumber];
    this.setState({
      guessMessageText,
      guessedCorrectly,
      guessedNumbers
    });
  }

  generateNumberToGuess(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  onSubmitRestart() {
    this.setGuessedNumbers([]);
    this.setGuessResultText(this.state.guessResultTextTemplates.start);
    this.setGuessedCorrectly(false);
    this.setNumberToGuess(this.generateNumberToGuess(this.props.minNumber, this.props.maxNumber));
  }

  hotOrCold(secretNumber, guess) {
    if (secretNumber === guess) {
      return this.state.guessResultOutcomes.gameWon;
    }
    const abs = Math.abs(secretNumber - guess);
    if (abs > 10) {
      return this.state.guessResultOutcomes.cold;
    }
    if (abs <= 10 && abs >= 5) {
      return this.state.guessResultOutcomes.warmer;
    }
    if (abs < 5) {
      return this.state.guessResultOutcomes.hot;
    }
  }

  render() {
    const {minNumber, maxNumber} = this.props;
    return (
      <div className="App">
        <AppElements />
        {/* <BasicForm /> */}
        <GuessResult guessResultText={this.state.guessResultText} />
          <BasicForm
            disableInputField={this.state.guessedCorrectly}
            onSubmit={number => this.state.guessedCorrectly ? this.onSubmitRestart() : this.onSubmitGuessedNumber(number)}
            min={minNumber}
            max={maxNumber}
            btnLabel={this.state.guessedCorrectly ? 'Restart Game!' : 'Guess'}
          />
        <p>Your Progress</p>
                  {/* <GuessedNumbersCount count={this.state.guessedNumbers.length} /> */}
        <p>Your Previous Guesses: <GuessesList numbers={this.state.guessedNumbers} />
</p>
      </div>
    );
  }
}

App.defaultProps = {
  minNumber: 1,
  maxNumber: 100
};