import React, { useState, useEffect } from "react";
import StyledGame from "./StyledGame";
import Box from "../Box/Box";
import { SelectedPattern } from "./components/SelectedPattern/SelectedPattern";
import {
  checkWinLevel,
  resetAllPatterns,
  checkAllFormsUsed,
} from "../../utils/utils";

const Game2 = ({
  selectedPattern,
  setSelectedPattern,
  patterns,
  setPatterns,
}) => {
  const [map, setMap] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, "B", 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, "A", 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [playerCanPlay, setPlayerCanPlay] = useState(true);
  const [entry, setEntry] = useState({
    x: 0,
    y: 0,
  });
  const [exit, setExit] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const noForms = checkAllFormsUsed(patterns);
    if (noForms) {
      const win = checkWinLevel(map, entry, exit);
      if (!win) {
        resetAllPatterns(patterns, setMap);
      }
    }
  }, [patterns]);

  useEffect(() => {
    const reverseMap = [...map].reverse();
    reverseMap.map((row, y) => {
      row.map((box, x) => {
        if (box === "A") {
          setEntry({
            ...entry,
            x: x * 100,
            y: y * 100,
          });
        }
        if (box === "B") {
          setExit({
            ...exit,
            x: x * 100,
            y: y * 100,
          });
        }
      });
    });
  }, []);

  const renderBox = () => {
    return map.map((row, y) => {
      return row.map((box, x) => {
        return <Box player2 nbColor={box} x={x} y={y} />;
      });
    });
  };

  return (
    <StyledGame>
      {renderBox()}
      {selectedPattern && (
        <SelectedPattern
          setMap={setMap}
          entry={entry}
          exit={exit}
          map={map}
          setSelectedPattern={setSelectedPattern}
          selectedPattern={selectedPattern}
        />
      )}
    </StyledGame>
  );
};

export default Game2;
