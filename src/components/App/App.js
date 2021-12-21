import React, { useState, useEffect } from 'react'
import StyledApp from './StyledApp'
import Game from '../Game/Game'
import Game2 from '../Game2/Game'
import Home from '../Home'
import { db, postNewForm, postPlayer } from '../../firebase/Database'
import { 
    levels
} from '../../levels/levels'
import { ZonePattern } from '../ZonePattern/ZonePattern'
import { getForm, getMax, getMin } from '../../utils/utils'

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
    const [level, setLevel] = useState(null)
    const [player, setPlayer] = useState(null)
    const [player1, setPlayer1] = useState(null)
    const [player2, setPlayer2] = useState(null)
    const [selectedPattern, setSelectedPattern] = useState(null)

    const onSelectPlayer = async (player) => {
        try {
            await postPlayer(player)
            setPlayer(player.id)
        } catch(err) {
            console.log('err', err)
        }
    }

    const checkIfLevelIsFinish = (level, map) => {
        if (!level) {
            setLevel(1)
        }
        let noBox = false
        map.map((row) => row.map(box => box !== 0 ? noBox = true : null))
        console.log(noBox)
        if (!noBox) {
            setTimeout(() => {
                setLevel(level + 1)
            }, 2000)
        }
    }

    useEffect(() => {
        if (!level) {
            return
        }
        if (level === 4) {
            setLevel(1)
            setMap(levels[1])
            return setPrevMap(levels[1])
        }
        setMap(levels[level])
        setPrevMap(levels[level])
    }, [level])

    useEffect(() => {
        checkIfLevelIsFinish(level, map)
    }, [map])

    const initializeGame = async () => {
        setSelectedPattern(null)
        await db.collection('players').doc('1').delete()
        await db.collection('players').doc('2').delete()
        await db.collection('players').doc('2').collection('forms').get()
        .then((snap) => {
            snap.docs.map(doc => {
                doc.ref.delete()
            })
        })
        .catch(err => console.log(err))

        db.collection('players').onSnapshot((snap) => {
            const rdy = snap.docs.length === 2
            if (rdy) {
                setPlayer1(snap.docs[0].data())
                setPlayer2(snap.docs[1].data())
                setPlayersRdy(true)
            } else {
                setPlayersRdy(false)
            }
        })
    }

    const postPattern = (positions, map) => {
        const copyMap = [...map]
        const minX = getMin(positions, 'x')
        const maxX = getMax(positions, 'x')
        const minY = getMin(positions, 'y')
        const maxY = getMax(positions, 'y')
        const form = getForm(copyMap, minX, maxX, minY, maxY)
        postNewForm(form)
    }

    const renderGame = (player) => {
        if (player === '1') {
            return (
                <Game
                    postPattern={postPattern}
                    map={map}
                    prevMap={prevMap}
                    setMap={setMap}
                    setPrevMap={setPrevMap}
                />
            )
        }
        if (player === '2') {
            return (
                <div className='container_game2'>
                    <Game2
                        selectedPattern={selectedPattern}
                        setSelectedPattern={setSelectedPattern}
                        map={map}
                        prevMap={prevMap}
                        setMap={setMap}
                        setPrevMap={setPrevMap}
                    />
                    <ZonePattern
                        setSelectedPattern={setSelectedPattern} 
                    />
                </div>
            )
        }
    }

    useEffect(() => {
        initializeGame()
    }, [])

        return (
            <StyledApp>
                {
                    playersRdy ? (
                        renderGame(player)
                    )
                    :
                        <Home
                            player={player}
                            map={map}
                            onSelectPlayer={onSelectPlayer}
                        />
                }
            </StyledApp>
        )
}

export default App