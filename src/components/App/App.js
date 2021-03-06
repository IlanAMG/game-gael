import React, { useState, useEffect } from "react";
import StyledApp from "./StyledApp";
import Game from "../Game/Game";
import Game2 from "../Game2/Game";
import Home from "../Home";
import { db, postNewForm, postPlayer } from "../../firebase/Database";
import { levels, levelsJ2 } from "../../levels/levels";
import { ZonePattern } from "../ZonePattern/ZonePattern";
import { getForm, getMax, getMin, checkAllFormsUsed } from "../../utils/utils";
import { Waiting } from "../Waiting/Waiting";

const App = () => {
  const [prevMap, setPrevMap] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);

  const [map, setMap] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);
  const [map2, setMap2] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, "B", 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, "A", 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

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

  const [playersRdy, setPlayersRdy] = useState(false);
  const [level, setLevel] = useState(1);
  const [player, setPlayer] = useState(null);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [waiting, setWaiting] = useState(null);
  const [winJ2, setJ2Win] = useState(false);

  const onSelectPlayer = async (player) => {
    try {
      await postPlayer(player);
      setPlayer(player.id);
    } catch (err) {
      console.log("err", err);
    }
  };

  const checkIfLevelIsFinish = (level, map) => {
    if (!level) {
      setLevel(1);
    }
    let noBox = false;
    map.map((row) => row.map((box) => (box !== 0 ? (noBox = true) : null)));
    if (noBox || !player1 || !player2 || !playersRdy || !player) return;

    setWaiting(2);
  };

  useEffect(() => {
    if (!level) {
      return;
    }
    if (level === 4) {
      setLevel(1);
      setMap(levels[1]);
      db.collection('players').doc('2').update({
        initialMap: {...levelsJ2[1]}
      })
      setMap2(levelsJ2[1]);
    } else {
      setMap(levels[level]);
      db.collection('players').doc('2').update({
        initialMap: {...levelsJ2[level]}
      })
      setMap2(levelsJ2[level]);
    }
  }, [level]);

  useEffect(() => {
    checkIfLevelIsFinish(level, map);
  }, [map]);

  const initializeGame = async () => {
    setSelectedPattern(null);
    await db.collection("players").doc("1").delete();
    await db.collection("players").doc("2").delete();
    await db
      .collection("players")
      .doc("2")
      .collection("forms")
      .get()
      .then((snap) => {
        snap.docs.map((doc) => {
          doc.ref.delete();
        });
      })
      .catch((err) => console.log(err));

    db.collection("players").onSnapshot((snap) => {
      const rdy = snap.docs.length === 2;
      if (rdy) {
        setPlayer1(snap.docs[0].data());
        setPlayer2(snap.docs[1].data());
        setPlayersRdy(true);
      } else {
        setPlayersRdy(false);
      }
    });
  };

  useEffect(() => {
    db.collection("players")
    .doc("2")
    .onSnapshot((doc) => {
      if (!doc.exists) return;
      if (doc.data().win) {
        setJ2Win(true)
      }
    });
  }, [])

  useEffect(() => {
    db.collection("players")
      .doc("2")
      .collection("forms")
      .onSnapshot((snap) => {
        const formsSnapShot = snap.docs;
        const copyPatterns = [...patterns];
        formsSnapShot.map(
          (form, i) => {
            const date = form.date
            delete form["date"]
            return (copyPatterns[i] = { ...form.data().form, uid: form.id, date, isUsed: form.data().isUsed, lastLevel: form.data().lastLevel })
          });
        setPatterns(copyPatterns);
      });
  }, []);

  useEffect(() => {
    if (waiting && player === "1" && winJ2) {
      db.collection('players').doc('2').update({ win: false })
      setLevel(level + 1);
      setWaiting(null);
      setJ2Win(false)
    }
  }, [winJ2]);

  const postPattern = async (positions, map, date) => {
    const copyMap = [...map];
    const minX = getMin(positions, "x");
    const maxX = getMax(positions, "x");
    const minY = getMin(positions, "y");
    const maxY = getMax(positions, "y");

    console.log(date)
    const form = getForm(copyMap, minX, maxX, minY, maxY);
    await postNewForm(form, date);
    return true
  };

  const renderGame = (player) => {
    if (player === "1") {
      return (
        <Game
        level={level}
          postPattern={postPattern}
          map={map}
          prevMap={prevMap}
          setMap={setMap}
          setPrevMap={setPrevMap}
        />
      );
    }
    if (player === "2") {
      return (
        <div className="container_game2">
          <Game2
            patterns={patterns}
            selectedPattern={selectedPattern}
            setSelectedPattern={setSelectedPattern}
            setLevel={setLevel}
            level={level}
            map={map2}
            setMap={setMap2}
          />
          <ZonePattern
            patterns={patterns}
            setPatterns={setPatterns}
            setSelectedPattern={setSelectedPattern}
          />
        </div>
      );
    }
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
      if (player === "1") {
        document.body.style.backgroundColor = '#000';
      }
      if (player === "2") {
        document.body.style.backgroundColor = '#FFF';
      }
  }, [player])
useEffect(() => {
    return () => document.body.style.backgroundColor = '#000';
}, [])

  return (
    <>
      <StyledApp>
        {waiting && player1 && player2 && <Waiting player={waiting} />}
        {playersRdy ? (
          renderGame(player)
        ) : (
          <Home player={player} map={map} onSelectPlayer={onSelectPlayer} />
        )}
      </StyledApp>
    </>
  );
};

export default App;
