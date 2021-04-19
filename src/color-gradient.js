import React from "react";
import Gradient from "javascript-color-gradient";

export default function ColorArray() {
  const secondGradient = new Gradient();

  secondGradient.setGradient("#251991","#077159","#e16214","#c41b12");

  secondGradient.setMidpoint(10);

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
