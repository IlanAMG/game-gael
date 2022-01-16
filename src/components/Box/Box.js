import React, { useState } from "react";
import StyledBox from "./StyledBox";

const Box = ({ x, y, nbColor, handleMouseDown, handleMouseUp, player2, animateToLeft, highlight, delay }) => {
  const position = { x, y };
  const [down, setDown] = useState(false)
  const [up, setUp] = useState(false)
  const [fixUp, setFixUp] = useState(false)
  const [fixDown, setFixDown] = useState(false)

  if (player2) {
    return <StyledBox highlight={highlight} nbColor={nbColor} delay={delay} />;
  }

  return (
    <StyledBox
      animateToLeft={animateToLeft}
      down={down}
      fixUp={fixUp}
      fixDown={fixDown}
      up={up}
      nbColor={nbColor === 0 ? "" : nbColor}
      onMouseDown={(e) => {
        setDown(true)
        setUp(false)
        setTimeout(() => {
          setFixUp(true)
          setFixDown(false)
        }, 800)
        handleMouseDown(e, nbColor, position)
      }}
      onMouseUp={(e) => {
        if (down) {
          setUp(true)
          setDown(false)
          setTimeout(() => {
            setFixDown(true)
            setFixUp(false)
          }, 800)
        }
        handleMouseUp(e, nbColor, position)
      }}
    />
  );
};

export default Box;
