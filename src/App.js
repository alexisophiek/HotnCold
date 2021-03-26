import './App.css';
import React from "react";
import Gradient from "javascript-color-gradient";


// Pop up that asks whether you'd like to play free guessing or by multiple choice! Also need to store the answer and the guess as a new object type per each round.
// Also, will create a dynamic selection box associated with each color based on the guess

function Header () {
  return (
    <header>
      <h1>Are you Hot or Cold?</h1>
      <ul><li>Help?</li><li>Start Over</li></ul>
    </header>
  );
}

function Body () {
  return (
    <>
    <section>
      <p>I'm thinking of a number. Can you guess it?</p>
    </section>
    <section><form>
    <input type="text"/>
  <input type="submit" value="Take a Guess" />
</form></section>
    </>
  );
}

function ColorArray() {
  const secondGradient = new Gradient();

  secondGradient.setGradient("#c41b12", "#e16214", "84a220", "607D8B");

  secondGradient.setMidpoint(12);

  const secondColorArr = secondGradient.getArray();

  return (
      <>
        {secondColorArr.map((color) => {
          return (
            <button
              className="button"
              style={{ backgroundColor: color }}
              key={color}
            />
          );
        })}
      </>
  );
}


function App() {
  return (
    <div className="App">
    <Header />
    <Body />
    <ColorArray />
    <h3>FOOTER</h3>
    </div>
  );
}

export default App;
