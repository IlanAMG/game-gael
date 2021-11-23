import React, { Component } from 'react'
import StyledGame from './StyledGame'
import Box from '../Box/Box'

class Game extends Component {
    state = {
        map: [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ]
    }

    renderBox() {
        return this.state.map.map((row, y) => {
            return row.map((box, x) => {
                return <Box x={x} y={y} />
            })
        })
    }

    render() {
        return (
            <StyledGame>
                {this.renderBox()}
            </StyledGame>
        )
    }
}

export default Game;