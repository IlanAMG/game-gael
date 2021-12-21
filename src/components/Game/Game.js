import React, { useState, useEffect } from 'react'
import StyledGame from './StyledGame'
import Box from '../Box/Box'

const Game = ({
    map,
    setMap,
    prevMap,
    setPrevMap
}) => {
    const [pair, setPair] = useState([])
    const [followingBoxResults, setFollowingBoxResults] = useState([
        [],
        [],
    ])
    const [playerCanPlay, setPlayerCanPlay] = useState(true)

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
        if (nbColor === 0 || !playerCanPlay) return
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

    const checkPosIncludes = (pos, arr) => {
        const filterArr = arr.map(el => JSON.stringify(el))
        return !filterArr.includes(JSON.stringify(pos))
    }

    const checkFollowingBox = (pos, nbColor, nbLastAdd) => {
        const followingBox =  [...pos]
        const posAround = []
        for (let i = 1; i <=  nbLastAdd; i++) {
            posAround.push(
                {x: followingBox[followingBox.length - i].x - 1, y: followingBox[followingBox.length - i].y},
                {x: followingBox[followingBox.length - i].x + 1, y: followingBox[followingBox.length - i].y},
                {x: followingBox[followingBox.length - i].x, y: followingBox[followingBox.length - i].y - 1},
                {x: followingBox[followingBox.length - i].x, y: followingBox[followingBox.length - i].y + 1}
            )
        }

        const newPosToCheck = posAround.map((potentialBox) => {
            const boxIsValid = checkPosIncludes(potentialBox, followingBox)
<<<<<<< HEAD
=======

>>>>>>> 9ff86d199109f7b6cf5dccd47baa2addcabd15ac
            const colorPotentialBox = 
                potentialBox['y'] >= 0 && potentialBox['y'] <= 6 && 
                potentialBox['y'] >= 0 && potentialBox['y'] <= 6 ? 
                    map[potentialBox['y']][potentialBox['x']]
                : 
                    null

            if (colorPotentialBox === nbColor && boxIsValid) {
                followingBox.push(potentialBox)
                return {
                    nbColor: colorPotentialBox,
                    pos: potentialBox
                }
            }
        }).filter(x => x)

        if (newPosToCheck.length > 0) {
            return checkFollowingBox(followingBox, nbColor, newPosToCheck.length)
        } else {
            return followingBox
        }
    }

    const deleteFollowingBox = (pattern, i) => {
        const copyFollowingBoxResults = [...followingBoxResults]
        const copyMap = [...map]
        //traitement
        if (pattern.length < 3) {
            copyFollowingBoxResults[i] = []
            return setTimeout(() => {
                setFollowingBoxResults(copyFollowingBoxResults)
                setPlayerCanPlay(true)
            }, 3000)
        }

        pattern.map(position => {
            copyMap[position['y']][position['x']] = 0
        })

        setTimeout(() => {
            setMap(copyMap)
            setPlayerCanPlay(true)
        }, 3000)
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
        
        setFollowingBoxResults([
            checkFollowingBox([copyPair[1]], posDown, 1),
            checkFollowingBox([copyPair[0]], posUp, 1)
        ])
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
        if (pair.length === 2) {
            setPlayerCanPlay(false)
            flippedBox()
        }
    }, [pair])`
    `
    useEffect(() => {
        if (followingBoxResult[0].length > 0) {
            deleteFollowingBox(followingBoxResult[0], 0)
        }
        if (followingBoxResult[1].length > 0) {
            deleteFollowingBox(followingBoxResult[1], 1)
        }
    }, [followingBoxResult])

    useEffect(() => {
        if (followingBoxResults[0].length > 0) 
            deleteFollowingBox(followingBoxResults[0], 0)
        
        if (followingBoxResults[1].length > 0) 
            deleteFollowingBox(followingBoxResults[1], 1)
    }, [followingBoxResults])

    return (
        <StyledGame>
            {renderBox()}
        </StyledGame>
    )
}

export default Game;