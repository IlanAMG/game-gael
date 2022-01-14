import React from "react";
import StyledBox from "./StyledBox";

const Box = ({ x, y, nbColor, handleMouseDown, handleMouseUp, player2 }) => {
  const position = { x, y };

  if (player2) {
    return <StyledBox nbColor={nbColor} />;
  }
  return (
    <StyledBox
      nbColor={nbColor === 0 ? "" : nbColor}
      onMouseDown={(e) => handleMouseDown(e, nbColor, position)}
      onMouseUp={(e) => handleMouseUp(e, nbColor, position)}
    />
  );
};

export default Box;
