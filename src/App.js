import "./App.css";
import React,{useState, useEffect} from "react";
import BasicForm from "./form-logic";
import TopNavigation from "./navigation";
import Footer from "./footer";
class AppElements extends React.Component {
  render() {
    return (
      <>
        <TopNavigation />
        <Footer />
      </>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGuess: '',
      currentAnswer: this.generateNumberToGuess(this.props.minNumber, this.props.maxNumber),
      previousGames: {},
      guessedCorrectly: false,
      previousGuesses: [],
      previousGames: {},
      guessResultOutcomes: {
        start: 'Make a Guess',
        gameWon: 'You are on Fire',
        hot: 'very Warm!',
        warmer: 'that is closer...or farther...',
        cold: 'brrrr...cold!'
      };
}


  render() {
    return (
      <div className="App">
        <AppElements />
        <BasicForm />
        <p>Explanation of Hot or Cold In Progress</p>
        {/* <p>Your Previous Guesses: {this.state.previousGuesses}</p> */}
      </div>
    );
  }
}
