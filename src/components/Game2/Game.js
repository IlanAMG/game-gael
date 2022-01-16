import React, { useState, useEffect } from "react";
import StyledGame from "./StyledGame";
import Box from "../Box/Box";
import { SelectedPattern } from "./components/SelectedPattern/SelectedPattern";
import {
  checkWinLevel,
  resetAllPatterns,
  checkAllFormsUsed,
} from "../../utils/utils";
import { db } from "../../firebase/Database";

const Game2 = ({
  selectedPattern,
  setSelectedPattern,
  patterns,
  level,
  setLevel,
  map,
  setMap,
}) => {
  const [isTouched, setIsTouched] = useState(false)

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
      const win = checkWinLevel(
        map,
        {x: entry.x / 100, y: entry.y / 100},
        {x: exit.x / 100, y: exit.y / 100},
        [{x: entry.x / 100, y: entry.y / 100}],
        1
      );
      if (!win) {
        resetAllPatterns(patterns, setMap);
      } else {
        db.collection('players').doc('2').update({ win: true })
        setLevel(level + 1)
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

  const highlightPath = (pos) => {
    if (isTouched) return false
    if (pos.x === 2 && pos.y === 5) return true
    if (pos.x === 3 && pos.y === 5) return true
    if (pos.x === 4 && pos.y === 5) return true
    if (pos.x === 4 && pos.y === 4) return true
    if (pos.x === 5 && pos.y === 4) return true
    if (pos.x === 5 && pos.y === 3) return true
  }

  const renderBox = () => {
    return map.map((row, y) => {
      return row.map((box, x) => {
        return <Box delay={x} highlight={highlightPath({x, y})} player2 nbColor={box} x={x} y={y} />;
      });
    });
  };

  useEffect(() => {
    if (selectedPattern) {
      setIsTouched(true)
    }
  }, [selectedPattern])

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
