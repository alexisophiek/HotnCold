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
    this.handleGuessCount = this.handleGuessCount.bind(this)
    this.state = {
      guessCount:0,
      maxCount: 10,
      showGameRules: false,
      currentGuess: '',
      // previousGames: {},
      guessedCorrectly: false,
      previousGuesses: [],
      duplicateGuessFeedback: 'You already guessed this Number!',
      guessResultOutcomes: {
        gameWon: 'You are on Fire!',
        hot: 'Very warm!',
        warmer: 'That is closer...',
        cold: 'Brrr, cold!',
        playAgain: 'Play again?',
        reSet: '',
        tenAttempts: 'You are out of guesses. Start a new game to continue.'
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
  setShowText(showText) {
    this.setState({showText});
  }
  setSecretNumber(secretNumber) {
    this.setState({secretNumber});
  }
  handleGuessCount(guessCount) {
    this.setState({guessCount});
  }

  hotOrCold(secretNumber, guess) {
    if (secretNumber === guess) {
      return this.state.guessResultOutcomes.gameWon
    };
    const guessIndex = this.state.guessCount;
    if (guessIndex > this.state.maxCount) {
      return null
      // return this.state.guessResultOutcomes.tenAttempts
    };
    const howFar = Math.abs(secretNumber - guess);
    if (howFar > 10) {
      return this.state.guessResultOutcomes.cold
    };
    if (howFar <= 10 && howFar >= 5) {
      return this.state.guessResultOutcomes.warmer
    };
    if (howFar < 5) {
      return this.state.guessResultOutcomes.hot
    };
  }

  onSubmitGuessedNumber(guessedNumber) {
    const previousGuesses = [...this.state.previousGuesses, guessedNumber];
    // if (this.state.previousGuesses.includes(guessedNumber)) {
    //   this.setGuessedCorrectly(prevState => ({
    //     check: !prevState.check
    //   })
    // }

    const guessCount = previousGuesses.length;
    const showText = this.hotOrCold(this.state.secretNumber, guessedNumber);
    const guessedCorrectly = this.state.secretNumber === guessedNumber;
    const currentGuess = guessedNumber;
    this.setState({
      showText,
      guessedCorrectly,
      currentGuess,
      previousGuesses,
      guessCount
    });
    
  }
    // if (guessCount > this.state.maxCount) {
//   return this.setGuessedCorrectly(({check}) => ({
//     check: !check
//   })),
//   this.showText

// };

generateNumberToGuess(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  onSubmitRestart() {
    this.setPreviousGuesses([]);
    this.setShowText(this.state.guessResultOutcomes.reSet);
    this.setGuessedCorrectly(false);
    this.setSecretNumber(this.generateNumberToGuess(this.props.minNumber, this.props.maxNumber));
    this.setCurrentGuess('');
    this.handleGuessCount(0);
  }

  render() {
    const {minNumber, maxNumber} = this.props;
    if (this.state.showGameRules) {
      return <HelpWindow onClickClose={() => this.setShowGameRules(false)} />
    }
    // console.log("These are the previous guesses", this.state.previousGuesses);
    // console.log("This is your current guess", this.state.currentGuess);

    return (
      <div className="App">
        <TopNavigation onClickNewGame={() => this.onSubmitRestart()} onClickShowRules={() => this.setShowGameRules(true)}/>
        <Footer />
        <BasicForm
          disableInputField={this.state.guessedCorrectly}
          onSubmit={number => this.state.guessedCorrectly ? this.onSubmitRestart() : this.onSubmitGuessedNumber(number)}
          min={minNumber}
          max={maxNumber}
          guessCount={this.state.guessCount}
          guessMaxCount={this.state.maxCount}
        />
        <GuessResult guessResultText={this.state.showText} />
        {/* <OutOfGuesses guessCount={this.state.guessCount}
          guessMaxCount={this.state.maxCount} /> */}
        <div>Your Current Guess: {this.state.currentGuess}</div>
        <div>Your Previous Guesses: {this.state.previousGuesses.toString()}</div>
        <GuessedNumbersCount count={this.state.guessCount} />
        <br></br><ColorArray />
      </div>
    );
  }
}

App.defaultProps = {
  minNumber: 1,
  maxNumber: 100
};