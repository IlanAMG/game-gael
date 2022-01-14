import React from "react";
import { BoxPatternChoice } from "../../Game2/components/BoxPatternChoice/BoxPatternChoice";
import StyledPattern from "./StyledPattern";

export const Pattern = ({ pattern }) => {
  const renderForm = () => {
    return Object.values(pattern).map((row, y) => {
      return row.map((box, x) => {
        return <BoxPatternChoice nbColor={box} />;
      });
    });
  };

  return (
    <StyledPattern pattern={Object.values(pattern)}>
      {renderForm()}
    </StyledPattern>
  );
};
