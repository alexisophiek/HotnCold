import React, {useState} from "react";
// import Gradient from "javascript-color-gradient";

export default class BasicForm extends React.Component {
  // const ColorArray = () => {
  //   const secondGradient = new Gradient();
  
  //   secondGradient.setGradient("#c41b12", "#e16214", "84a220", "607D8B");
  
  //   secondGradient.setMidpoint(12);
  
  //   const secondColorArr = secondGradient.getArray();
  
  //   return (
  //     <>
  //       {secondColorArr.map((color) => {
  //         return (
  //           <button
  //             className="button"
  //             style={{ backgroundColor: color }}
  //             key={color}
  //           />
  //         );
  //       })}
  //     </>
  //   );
  // };


  render() {
    return (
      <>
        <section>
          <p>I'm thinking of a number. Can you guess it?</p>
        </section>
        <form>
          <input type="text" name="guessing"/>
          <input type="submit" value="Take a Guess" />
        </form>
      </>
    );
  }
}

