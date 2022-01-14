import React, { useState, useEffect, useCallback } from "react";
import {
  checkIfCollisionRight,
  checkIfCollisionLeft,
  checkIfCollisionUp,
  checkIfCollisionDown,
  getAllPositionsBloc,
  checkIfCanPose,
  fixePattern,
  removePattern,
} from "../../../../utils/utils";
import Box from "../../../Box/Box";

import StyledSelectedPattern from "./StyledSelectedPattern";

export const SelectedPattern = ({
  selectedPattern,
  setSelectedPattern,
  entry,
  exit,
  map,
  setMap,
}) => {
  const [actualPositionBloc, setActualPositionBloc] = useState([]);

  const getDirection = useCallback(
    (e) => {
      const { key } = e;
      let copySelectedPattern = { ...selectedPattern };
      if (key === "ArrowRight") {
        const allPositionsBlocBeforeMove = getAllPositionsBloc(selectedPattern);
        let isOk = checkIfCollisionRight(
          selectedPattern,
          entry,
          exit,
          allPositionsBlocBeforeMove
        );
        if (isOk) {
          copySelectedPattern.position.x += 100;
          const allPositionsBloc = getAllPositionsBloc(copySelectedPattern);
          setSelectedPattern(copySelectedPattern);
          setActualPositionBloc(allPositionsBloc);
        }
      }
      if (key === "ArrowLeft") {
        const allPositionsBlocBeforeMove = getAllPositionsBloc(selectedPattern);
        let isOk = checkIfCollisionLeft(
          selectedPattern,
          entry,
          exit,
          allPositionsBlocBeforeMove
        );
        if (isOk) {
          copySelectedPattern.position.x -= 100;
          const allPositionsBloc = getAllPositionsBloc(copySelectedPattern);
          setSelectedPattern(copySelectedPattern);
          setActualPositionBloc(allPositionsBloc);
        }
      }
      if (key === "ArrowDown") {
        const allPositionsBlocBeforeMove = getAllPositionsBloc(selectedPattern);
        let isOk = checkIfCollisionDown(
          selectedPattern,
          entry,
          exit,
          allPositionsBlocBeforeMove
        );
        if (isOk) {
          copySelectedPattern.position.y -= 100;
          const allPositionsBloc = getAllPositionsBloc(copySelectedPattern);
          setSelectedPattern(copySelectedPattern);
          setActualPositionBloc(allPositionsBloc);
        }
      }
      if (key === "ArrowUp") {
        const allPositionsBlocBeforeMove = getAllPositionsBloc(selectedPattern);
        let isOk = checkIfCollisionUp(
          selectedPattern,
          entry,
          exit,
          allPositionsBlocBeforeMove
        );
        if (isOk) {
          copySelectedPattern.position.y += 100;
          const allPositionsBloc = getAllPositionsBloc(copySelectedPattern);
          setSelectedPattern(copySelectedPattern);
          setActualPositionBloc(allPositionsBloc);
        }
      }
      if (key === "Enter") {
        const allPositionsBloc = getAllPositionsBloc(selectedPattern);
        let isOk = checkIfCanPose(
          selectedPattern,
          entry,
          exit,
          allPositionsBloc
        );
        if (isOk) {
          fixePattern(allPositionsBloc, map, setMap);
          removePattern(selectedPattern, setSelectedPattern);
        } else {
          alert("not");
        }
      }
    },
    [selectedPattern]
  );

  useEffect(() => {
    window.addEventListener("keydown", getDirection);
    return () => {
      window.removeEventListener("keydown", getDirection);
    };
  }, [getDirection, selectedPattern]);

  useEffect(() => {
    getAllPositionsBloc(selectedPattern, setActualPositionBloc);
  }, []);

  useEffect(() => {
    console.log(actualPositionBloc);
  }, [actualPositionBloc]);

  const renderForm = () => {
    return selectedPattern.pattern.map((row, y) => {
      return row.map((box, x) => {
        return <Box player2 nbColor={box} x={x} y={y} />;
      });
    });
  };

  return (
    <StyledSelectedPattern
      pattern={selectedPattern.pattern}
      position={selectedPattern.position}
    >
      {renderForm()}
    </StyledSelectedPattern>
  );
};
