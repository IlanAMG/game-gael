import React, { useState, useEffect } from 'react'
import StyledGame from './StyledGame'
import Box from '../Box/Box'
import { SelectedPattern } from './components/SelectedPattern/SelectedPattern'

const Game2 = ({
    selectedPattern,
    setSelectedPattern
}) => {
    const [map, setMap] = useState([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, "B", 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, "A", 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ])
    const [playerCanPlay, setPlayerCanPlay] = useState(true)
    const [entry, setEntry] = useState({
        x: 0,
        y: 0,
    })
    const [exit, setExit] = useState({
        x: 0,
        y: 0,
    })

    useEffect(() => {
        const reverseMap = [...map].reverse()
        reverseMap.map((row, y) => {
            row.map((box, x) => {
                if (box === "A") {
                    setEntry({
                        ...entry,
                        x: x * 100,
                        y: y * 100
                    })
                }
                if (box === "B") {
                    setExit({
                        ...exit,
                        x: x * 100,
                        y: y * 100
                    })
                }
            })
        })
    }, [])

    const renderBox = () => {
        return map.map((row, y) => {
            return row.map((box, x) => {
                return (
                    <Box
                        player2
                        nbColor={box}
                        x={x}
                        y={y}
                    />
                )
            })
        })
    }

    return (
        <StyledGame>
            {renderBox()}
            {selectedPattern &&
                <SelectedPattern
                    setMap={setMap}
                    entry={entry}
                    exit={exit}
                    map={map}
                    setSelectedPattern={setSelectedPattern}
                    selectedPattern={selectedPattern}
                />
            }
        </StyledGame>
    )
}

export default Game2;