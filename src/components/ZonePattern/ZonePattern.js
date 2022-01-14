import React from "react";
import StyledZonePattern from "./StyledZonePattern";
import { Zone } from "./components/Zone";
import { Pattern } from "./components/Pattern";
import { db } from "../../firebase/Database";
import { returnOnlyPattern } from "../../utils/utils";

export const ZonePattern = ({ setSelectedPattern, patterns }) => {
  return (
    <StyledZonePattern>
      {patterns.map((pattern) => {
        if (pattern.isUsed) return;
        return (
          <Zone
            setSelectedPattern={setSelectedPattern}
            withPattern={Object.keys(returnOnlyPattern(pattern)).length > 0}
            pattern={pattern}
            returnOnlyPattern={returnOnlyPattern}
          >
            {Object.keys(returnOnlyPattern(pattern)).length > 0 && (
              <Pattern pattern={returnOnlyPattern(pattern)} />
            )}
          </Zone>
        );
      })}
    </StyledZonePattern>
  );
};
