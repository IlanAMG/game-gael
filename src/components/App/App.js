import React, { useState, useEffect } from 'react'
import StyledApp from './StyledApp'
import Game from '../Game/Game'
import Home from '../Home'
<<<<<<< HEAD
=======
import { db, postPlayer } from '../../firebase/Database'
>>>>>>> 9ff86d199109f7b6cf5dccd47baa2addcabd15ac
import { 
    level1,
    level2,
    level3
} from '../../levels/levels'
<<<<<<< HEAD
=======

const App = () => {
    const [prevMap, setPrevMap] = useState([
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ])
>>>>>>> 9ff86d199109f7b6cf5dccd47baa2addcabd15ac

    const [map, setMap] = useState([
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ])

    const [playersRdy, setPlayersRdy] = useState(false)

    const onSelectPlayer = async (player) => {
        try {
            await postPlayer(player)
        } catch(err) {
            console.log('err', err)
        }
    }

    useEffect(() => {
        setMap(level1)
        setPrevMap(level1)
    }, [])

    useEffect(() => {
        db.collection('players').onSnapshot((snap) => {
            const rdy = snap.docs.length === 2
            if (rdy) {
                setPlayersRdy(true)
            } else {
                setPlayersRdy(false)
            }
        })
    }, [])

        return (
            <StyledApp>
                {
                    playersRdy ? 
                        <Game
                            map={map}
                            prevMap={prevMap}
                            setMap={setMap}
                            setPrevMap={setPrevMap}
                        />
                    :
                        <Home
                            map={map}
                            onSelectPlayer={onSelectPlayer}
                        />
                }
            </StyledApp>
        )
}

export default App