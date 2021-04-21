import "./App.css";
import React from "react";
import BasicForm from "./form-logic";
import TopNavigation from "./navigation";
import Footer from "./footer";
import HelpWindow from "./help-window";
import GuessResult from './guess-result';
import GuessedNumbersCount from './guess-count';
import ColorArray from './color-gradient';
import MyBarChart from "./individual-viz";
// import data from "./data.json";
import { rgb } from "d3-color";



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
        gameWon: 'Congratulations, you did it!',
        hot: 'You are on Fire!',
        warmer: 'Warming Up!',
        cold: 'Brrr, cold!',
        playAgain: 'Play again?',
        reSet: ''
      },
      colorResults: {
        gameWon: 'rgb(160,5,50)',
        warmest: 'rgb(205,50,19)',
        warmer: 'rgb(222,80,19)',
        warm: rgb(213,100,19),
        lukeWarm: rgb(181,101,34),
        meh: rgb(116,106,55),
        chilled: rgb(51,110,75),
        cold: '#4B6E6E',
        colder: rgb(19, 78, 111),
        coldest: '#251991',
        playAgain: '##000'
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
  setColorResult(colorResults) {
    this.setState({colorResults});
  }
  setSecretNumber(secretNumber) {
    this.setState({secretNumber});
  }
  handleGuessCount(guessCount) {
    this.setState({guessCount});
  }

  hotOrCold(secretNumber, guess, guessCount, maxCount) {
    if (guessCount > maxCount) {
      console.log(this.state)
      return this.state.guessResultOutcomes.playAgain
    };
    if (secretNumber === guess) {
      return this.state.guessResultOutcomes.gameWon
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

  getColor(secretNumber, guess, guessCount, maxCount) {
    if (guessCount > maxCount) {
      return this.state.colorResults.playAgain
    };
    if (secretNumber === guess) {
      return this.state.colorResults.gameWon
    };
    const howFar = Math.abs(secretNumber - guess);
    if (howFar > 90 && howFar >= 70) {
      return this.state.colorResults.coldest
    };
    if (howFar >= 70 && howFar >= 50) {
      return this.state.colorResults.colder
    };
    if (howFar >= 50 && howFar >= 40) {
      return this.state.colorResults.cold
    };
    if (howFar >= 40 && howFar >= 30) {
      return this.state.colorResults.chilled
    };
    if (howFar >= 30 && howFar >= 20) {
      return this.state.colorResults.meh
    };
    if (howFar >= 20 && howFar >= 15) {
      return this.state.colorResults.lukeWarm
    };
    if (howFar <= 15 && howFar >= 10) {
      return this.state.colorResults.warm
    };
    if (howFar <= 10 && howFar >= 5) {
      return this.state.colorResults.warmer
    };
    if (howFar < 5) {
      return this.state.colorResults.warmest
    };
  }

  onSubmitGuessedNumber(guessedNumber) {
    const previousGuesses = [...this.state.previousGuesses, guessedNumber];
    const guessCount = previousGuesses.length;
    const showText = this.hotOrCold(this.state.secretNumber, guessedNumber, guessCount, this.state.maxCount);
    const showColor = this.getColor(this.state.secretNumber, guessedNumber, guessCount, this.state.maxCount);
    const guessedCorrectly = this.state.secretNumber === guessedNumber;
    const currentGuess = guessedNumber;
    this.setState({
      showText,
      guessedCorrectly,
      currentGuess,
      previousGuesses,
      guessCount,
      showColor
    });
  }
  

  pushRealData(guessedNumber) {
    const previousGuesses = [...this.state.previousGuesses, guessedNumber];
    var jsonObj = {};
    for (var i = 0 ; i < previousGuesses.length; i++) {
        jsonObj[(i+1)] = previousGuesses[i];
    }
    let result = Object.keys(jsonObj).map(key => ({x: Number(key), y: jsonObj[key]}));

    // console.log(result);
    return (
      result
    )
  }


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

    return (
      <div className="App">
        <TopNavigation onClickNewGame={() => this.onSubmitRestart()} onClickShowRules={() => this.setShowGameRules(true)}/>
        <ColorArray />
        <Footer />
        <BasicForm
          disableInputField={this.state.guessedCorrectly}
          onSubmit={number => this.state.guessedCorrectly ? this.onSubmitRestart() : this.onSubmitGuessedNumber(number)}
          min={minNumber}
          max={maxNumber}
          guessCount={this.state.guessCount}
          guessMaxCount={this.state.maxCount}
        />
        <div style={{color:this.state.showColor}}>
        <GuessResult guessResultText={this.state.showText} /></div>
        <div>Your Current Guess: {this.state.currentGuess}</div>
        <div>Your Previous Guesses: {this.state.previousGuesses.toString()}</div>
        <GuessedNumbersCount count={this.state.guessCount} />
        <br></br>
        <MyBarChart data ={this.pushRealData()} color={this.state.showColor}/>
      </div>
    );
  }
}

App.defaultProps = {
  minNumber: 1,
  maxNumber: 100
};