import React, { useState, useEffect } from 'react'
import StyledGame from './StyledGame'
import Box from '../Box/Box'
import { SelectedPattern } from './components/SelectedPattern/SelectedPattern'

const Game2 = ({
    selectedPattern,
    setSelectedPattern
}) => {
    const [map, setMap] = useState([
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ])
    const [playerCanPlay, setPlayerCanPlay] = useState(true)

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
                    setSelectedPattern={setSelectedPattern}
                    selectedPattern={selectedPattern}
                />
            }
        </StyledGame>
    )
}

export default Game2;