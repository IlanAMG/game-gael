import React, { useState, useEffect } from 'react'
import StyledGame from './StyledGame'
import Box from '../Box/Box'
import { ArrowBack } from '../ArrowBack'
import { db } from '../../firebase/Database'
import _ from "lodash";

const Game = ({
    map,
    setMap,
    setPrevMap,
    postPattern,
    level
}) => {
    const [pair, setPair] = useState([])
    const [followingBoxResults, setFollowingBoxResults] = useState([
        [],
        [],
    ])
    const [playerCanPlay, setPlayerCanPlay] = useState(true)
    const [isTouched, setIsTouched] = useState(false)

    const rollback = async () => {
        const prevMap = (await db.collection('players').doc('1').get())?.data().prevMap
        const allForms = (await db.collection('players').doc('2').collection('forms').get()).docs.map(x => ({ uid: x.id, ...x.data() }))
        if (!prevMap && !Object.keys(prevMap).length && !allForms && !allForms.length) return;
        if (allForms.length) {
            const newGroupedForms = _.chain(allForms)
            .groupBy("date")
            .map((value, key) => {
              return { date: key, form: value };
            })
            .value();
            const max = newGroupedForms.reduce(function(prev, curr) {
                return prev.date > curr.date ? prev : curr;
            });
            await Promise.all(max.form.map(async (el) => await db.collection('players').doc('2').collection('forms').doc(el.uid).delete()))
        }
        setMap(Object.values(prevMap).map(value => value))
    }

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
        let audio = new Audio("https://firebasestorage.googleapis.com/v0/b/ping-pong-2d7e1.appspot.com/o/soundDown.mp3?alt=media&token=703842b9-80f2-47f1-867c-07d41bddc2cc")
        audio.play()
        e.preventDefault()
        if (nbColor === 0 || !playerCanPlay) return
        const copyPair = [...pair]
        copyPair.push(pos)
        setPair(copyPair)
        setIsTouched(true)
    }

    const handleMouseUp = (e, nbColor, pos) => {
        let audio = new Audio("https://firebasestorage.googleapis.com/v0/b/ping-pong-2d7e1.appspot.com/o/soundUp.mp3?alt=media&token=ce4a2998-b1b9-4862-a53c-9d51785e28f2")
        audio.play()
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

            const colorPotentialBox = 
                potentialBox['y'] >= 0 && potentialBox['y'] <= 6 && 
                potentialBox['x'] >= 0 && potentialBox['x'] <= 6 ? 
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

    const deleteFollowingBox = async (pattern, i, date) => {
        const copyFollowingBoxResults = [...followingBoxResults]
        const copyMap = [...map]
        //traitement
        if (pattern.length < 3) {
            copyFollowingBoxResults[i] = []
            return setTimeout(() => {
                setFollowingBoxResults(copyFollowingBoxResults)
                setPlayerCanPlay(true)
            }, 2000)
        }
        await postPattern(pattern, copyMap, date)

        pattern.map(position => {
            copyMap[position['y']][position['x']] = 0
        })
        setTimeout(() => {
            setMap(copyMap)
            setPlayerCanPlay(true)
        }, 1000)
    }

    const flippedBox = async () => {
        const copyPair = [...pair]
        const copyMap = [...map]
        await db.collection('players').doc('1').update({
            prevMap: {...copyMap}
        })
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
                        animateToLeft={x === 3 && x === y && !isTouched}
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
    }, [pair])

    const deleteBoxInMap = () => {
        if (followingBoxResults[0].length > 0 && followingBoxResults[1].length > 0) {
            const date = Date.now()
            if (followingBoxResults[0].length > 0) 
                deleteFollowingBox(followingBoxResults[0], 0, date)
            
            if (followingBoxResults[1].length > 0) 
                deleteFollowingBox(followingBoxResults[1], 1, date)
        }
    }

    useEffect(() => {
        deleteBoxInMap()
    }, [followingBoxResults])

    return (
        <StyledGame>
            <ArrowBack rollback={rollback} />
            {renderBox()}
        </StyledGame>
    )
}

export default Game;