    const ColorArray = () => {
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
    };