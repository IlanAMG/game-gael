import React from "react";

export const Zone = ({
  withPattern,
  pattern,
  children,
  setSelectedPattern,
  returnOnlyPattern,
}) => {
  const selectPattern = () => {
    const formArray = Object.values(returnOnlyPattern(pattern)).map((el) => el);
    setSelectedPattern({
      position: { x: 0, y: 0 },
      pattern: formArray,
      uid: pattern.uid,
    });
  };

  return (
    <div onClick={withPattern ? () => selectPattern() : null} className="zone">
      {children}
    </div>
  );
};
