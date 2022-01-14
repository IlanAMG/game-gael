import { db } from "../firebase/Database";

export const removeWithIndex = (arr, index) => {
  return arr.filter((_, i) => i !== index);
};

export const getMin = (positions, xOrY) => {
  let min = 999;
  positions.map((pos) => {
    if (pos[xOrY] < min) {
      min = pos[xOrY];
    }
  });
  return min;
};
export const getMax = (positions, xOrY) => {
  let max = 0;
  positions.map((pos) => {
    if (pos[xOrY] > max) {
      max = pos[xOrY];
    }
  });
  return max;
};

export const getForm = (copyMap, minX, maxX, minY, maxY) => {
  const newMap = copyMap.map((row, y) => {
    return row.map((box, x) => {
      if (y < minY || y > maxY || x < minX || x > maxX) {
        return 3;
      } else {
        return box;
      }
    });
  });
  const form = newMap
    .map((row) => row.filter((el) => el !== 3))
    .filter((row) => row.length !== 0);
  const objectForm = {};

  form.map((row, i) => (objectForm[i] = row));

  return objectForm;
};

export const getAllPositionsBloc = (selectedPattern, action) => {
  const copyPattern = [...selectedPattern.pattern];
  const positionDuPattern = {
    x: selectedPattern.position.x / 100,
    y: selectedPattern.position.y / 100,
  };
  // console.log('position du pattern', positionDuPattern)

  let allPositionsBloc = [];

  copyPattern.reverse().map((row, y) => {
    return row.map((box, x) => {
      // const xDuCube = x
      // const yDuCube = y
      // const hauteur = selectedPattern.pattern.length
      // const largeur = row.length

      // console.log(hauteur)
      // console.log(largeur)
      return allPositionsBloc.push({
        x: positionDuPattern.x + x,
        y: positionDuPattern.y + y,
        nbColor: box,
      });
    });
  });

  action && action(allPositionsBloc);
  return allPositionsBloc;
};

export const checkIfCollisionRight = (
  pattern,
  entry,
  exit,
  allPositionsBloc
) => {
  const noWall = pattern.position.x < 600;

  const blocDetected = allPositionsBloc.find((positionDeBloc) => {
    return (
      (positionDeBloc.nbColor !== 0 &&
        positionDeBloc.x + 1 === exit.x / 100 &&
        positionDeBloc.y === exit.y / 100) ||
      (positionDeBloc.nbColor !== 0 &&
        positionDeBloc.x + 1 === entry.x / 100 &&
        positionDeBloc.y === entry.y / 100)
    );
  });
  return noWall && !blocDetected;
};
export const checkIfCollisionLeft = (
  pattern,
  entry,
  exit,
  allPositionsBloc
) => {
  const noWall = pattern.position.x > 0;
  const blocDetected = allPositionsBloc.find((positionDeBloc) => {
    return (
      (positionDeBloc.nbColor !== 0 &&
        positionDeBloc.x - 1 === exit.x / 100 &&
        positionDeBloc.y === exit.y / 100) ||
      (positionDeBloc.nbColor !== 0 &&
        positionDeBloc.x - 1 === entry.x / 100 &&
        positionDeBloc.y === entry.y / 100)
    );
  });
  return noWall && !blocDetected;
};
export const checkIfCollisionUp = (pattern, entry, exit, allPositionsBloc) => {
  const noWall = pattern.position.y < 600;
  const blocDetected = allPositionsBloc.find((positionDeBloc) => {
    return (
      (positionDeBloc.nbColor !== 0 &&
        positionDeBloc.x === exit.x / 100 &&
        positionDeBloc.y + 1 === exit.y / 100) ||
      (positionDeBloc.nbColor !== 0 &&
        positionDeBloc.x === entry.x / 100 &&
        positionDeBloc.y + 1 === entry.y / 100)
    );
  });
  return noWall && !blocDetected;
};
export const checkIfCollisionDown = (
  pattern,
  entry,
  exit,
  allPositionsBloc
) => {
  const noWall = pattern.position.y > 0;
  const blocDetected = allPositionsBloc.find((positionDeBloc) => {
    return (
      (positionDeBloc.nbColor !== 0 &&
        positionDeBloc.x === exit.x / 100 &&
        positionDeBloc.y - 1 === exit.y / 100) ||
      (positionDeBloc.nbColor !== 0 &&
        positionDeBloc.x === entry.x / 100 &&
        positionDeBloc.y - 1 === entry.y / 100)
    );
  });
  return noWall && !blocDetected;
};

export const checkIfCanPose = (pattern, entry, exit) => {
  const allPositionsBloc = getAllPositionsBloc(pattern);
  const blocDetected = allPositionsBloc.find((positionDeBloc) => {
    return (
      (positionDeBloc.nbColor !== 0 &&
        positionDeBloc.x === exit.x / 100 &&
        positionDeBloc.y === exit.y / 100) ||
      (positionDeBloc.nbColor !== 0 &&
        positionDeBloc.x === entry.x / 100 &&
        positionDeBloc.y === entry.y / 100)
    );
  });
  return !blocDetected;
};

export const fixePattern = (actualPositionBloc, map, setMap) => {
  const copyMap = [...map];
  const format = {
    0: "7",
    1: "6",
    2: "5",
    3: "4",
    4: "3",
    5: "2",
    6: "1",
    7: "0",
  };
  actualPositionBloc.map((bloc) => {
    if (bloc.nbColor !== 0) {
      copyMap[format[bloc.y]][bloc.x] = bloc.nbColor;
    }
  });

  setMap(copyMap);
};

export const removePattern = async (selectedPattern, setSelectedPattern) => {
  setSelectedPattern(null);
  try {
    await db
      .collection("players")
      .doc("2")
      .collection("forms")
      .doc(selectedPattern.uid)
      .update({
        isUsed: true,
      });
  } catch (err) {
    console.log(err.message);
    alert("Une erreur est survenue");
  }
};

export const returnOnlyPattern = (pattern) => {
  const copyPattern = { ...pattern };
  Object.entries(copyPattern).map(([key, value]) => {
    if (typeof value !== "object") {
      delete copyPattern[key];
    }
  });
  return copyPattern;
};

// const checkFollowingBox = (pos, nbColor, nbLastAdd) => {
//   const followingBox =  [...pos]
//   const posAround = []
//   for (let i = 1; i <=  nbLastAdd; i++) {
//       posAround.push(
//           {x: followingBox[followingBox.length - i].x - 1, y: followingBox[followingBox.length - i].y},
//           {x: followingBox[followingBox.length - i].x + 1, y: followingBox[followingBox.length - i].y},
//           {x: followingBox[followingBox.length - i].x, y: followingBox[followingBox.length - i].y - 1},
//           {x: followingBox[followingBox.length - i].x, y: followingBox[followingBox.length - i].y + 1}
//       )
//   }

//   const newPosToCheck = posAround.map((potentialBox) => {
//       const boxIsValid = checkPosIncludes(potentialBox, followingBox)

//       const colorPotentialBox =
//           potentialBox['y'] >= 0 && potentialBox['y'] <= 6 &&
//           potentialBox['y'] >= 0 && potentialBox['y'] <= 6 ?
//               map[potentialBox['y']][potentialBox['x']]
//           :
//               null

//       if (colorPotentialBox === nbColor && boxIsValid) {
//           followingBox.push(potentialBox)
//           return {
//               nbColor: colorPotentialBox,
//               pos: potentialBox
//           }
//       }
//   }).filter(x => x)

//   if (newPosToCheck.length > 0) {
//       return checkFollowingBox(followingBox, nbColor, newPosToCheck.length)
//   } else {
//       return followingBox
//   }
// }

export const checkWinLevel = (map, entry, exit) => {};

export const resetAllPatterns = async (patterns, setMap) => {
  try {
    await Promise.all(
      patterns
        .filter((pattern) => pattern.uid)
        .map(async (pattern) => {
          await db
            .collection("players")
            .doc("2")
            .collection("forms")
            .doc(pattern.uid)
            .update({
              isUsed: false,
            });
        })
    );
    setMap([
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, "B", 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, "A", 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  } catch (err) {
    console.log(err.message);
    alert("Une erreur est survenue");
  }
};

export const checkAllFormsUsed = (patterns) => {
  const nbFormsUsed = patterns.filter(
    (pattern) => pattern.isUsed && pattern.uid
  ).length;

  return (
    nbFormsUsed === patterns.filter((pattern) => pattern.uid).length &&
    nbFormsUsed !== 0
  );
};
