import React, { useState, useEffect } from 'react'
import StyledGame from './StyledGame'
import Box from '../Box/Box'
import { 
    level1,
    level2
} from '../../levels/levels'

const Game = () => {
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
    const [pair, setPair] = useState([])

    const checkValidBox = (posUp) => {
        const posDown = pair[0]
        const posAround = [
            JSON.stringify({x: posDown.x - 1, y: posDown.y}),
            JSON.stringify({x: posDown.x + 1, y: posDown.y}),
            JSON.stringify({x: posDown.x, y: posDown.y - 1}),
            JSON.stringify({x: posDown.x, y: posDown.y + 1})
        ]

        if (posAround.includes(JSON.stringify(posUp))) {
            return true
        } else {
            return false
        }      
    }

    const handleMouseDown = (e, nbColor, pos) => {
        e.preventDefault()
        if (nbColor === 0) return
        const copyPair = [...pair]
        copyPair.push(pos)
        setPair(copyPair)
    }

    const handleMouseUp = (e, nbColor, pos) => {
        e.preventDefault()
        if (nbColor === 0) {
            return setPair([])
        }

        if (pair.length === 1) {
            const posUpIsValid = checkValidBox(pos)
            
            if (!posUpIsValid) {
                setPair([])
            } else {
                const copyPair = [...pair]
                copyPair.push(pos)
                setPair(copyPair)
            }
        }
    }

    const checkFollowingBox = (pos, nbColor) => {
        // let followingBox =  [pos]
        // const posAround = [
        //     {x: pos.x - 1, y: pos.y},
        //     {x: pos.x + 1, y: pos.y},
        //     {x: pos.x, y: pos.y - 1},
        //     {x: pos.x, y: pos.y + 1}
        // ]

        // const newPosToCheck = posAround.map((potentialBox) => {
        //     const colorPotentialBox = map[potentialBox['y']][potentialBox['x']]
        //     if (colorPotentialBox === nbColor) {
        //         followingBox.push(potentialBox)
        //         return {
        //             nbColor: colorPotentialBox,
        //             pos: potentialBox
        //         }
        //     }
        // })

        // if (newPosToCheck.length > 0) {
        //     return checkFollowingBox(newPosToCheck[0]['pos'], newPosToCheck[0]['nbColor'])
        // }
    }

    const flippedBox = () => {
        const copyPair = [...pair]
        const copyMap = [...map]
        const posDown = copyMap[copyPair[0]['y']][copyPair[0]['x']]
        const posUp = copyMap[copyPair[1]['y']][copyPair[1]['x']]
        setPair([])

        copyMap[copyPair[0]['y']][copyPair[0]['x']] = posUp
        copyMap[copyPair[1]['y']][copyPair[1]['x']] = posDown

        setMap(copyMap)
        checkFollowingBox(copyPair[0], posDown)
        // checkFollowingBox(copyPair[1], posUp)
    }

    const renderBox = () => {
        return map.map((row, y) => {
            return row.map((box, x) => {
                return (
                    <Box
                        handleMouseDown={handleMouseDown}
                        handleMouseUp={handleMouseUp}
                        nbColor={box}
                        x={x}
                        y={y}
                    />
                )
            })
        })
    }

    useEffect(() => {
        setMap(level1)
        setPrevMap(level1)
    }, [])

    useEffect(() => {
        if (pair.length === 2) {
            flippedBox()
        }
    }, [pair])

    return (
        <StyledGame>
            {renderBox()}
        </StyledGame>
    )
}

export default Game;