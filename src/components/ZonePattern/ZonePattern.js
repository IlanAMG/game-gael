import React, { useState, useEffect } from "react";
import StyledZonePattern from "./StyledZonePattern";
import { Zone } from "./components/Zone";
import { Pattern } from "./components/Pattern";
import { db } from "../../firebase/Database";
import { returnOnlyPattern } from "../../utils/utils";

export const ZonePattern = ({ setSelectedPattern }) => {
  const [patterns, setPatterns] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);

  useEffect(() => {
    db.collection("players")
      .doc("2")
      .collection("forms")
      .onSnapshot((snap) => {
        const formsSnapShot = snap.docs;
        const copyPatterns = [...patterns];
        formsSnapShot.map(
          (form, i) => (copyPatterns[i] = { ...form.data(), uid: form.id })
        );
        setPatterns(copyPatterns);
      });
  }, []);

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
