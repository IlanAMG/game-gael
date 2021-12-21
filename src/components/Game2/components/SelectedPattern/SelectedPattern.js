import React, { useEffect, useCallback } from 'react'
import Box from '../../../Box/Box'

import StyledSelectedPattern from './StyledSelectedPattern'

export const SelectedPattern = ({ selectedPattern, setSelectedPattern }) => {
    const getDirection = useCallback(e => {
        const { key } = e
        console.log(key)
        let copySelectedPattern = {...selectedPattern}
        if (key === 'ArrowRight') {
            // let isOk = checkIfCollisionRight()
            if (true) {
                copySelectedPattern.position.x += 100
                setSelectedPattern(copySelectedPattern)
            }
        }
        if (key === 'ArrowLeft') {
            // let isOk = checkIfCollisionLeft()
            if (true) {
                copySelectedPattern.position.x -= 100
                setSelectedPattern(copySelectedPattern)
            }
        }
        if (key === 'ArrowDown') {
            // let isOk = checkIfCollisionDown()
            if (true) {
                copySelectedPattern.position.y -= 100
                setSelectedPattern(copySelectedPattern)
            }
        }
        if (key === 'ArrowUp') {
            // let isOk = checkIfCollisionDown()
            if (true) {
                copySelectedPattern.position.y += 100
                setSelectedPattern(copySelectedPattern)
            }
        }
    }, [selectedPattern])

    useEffect(() => {
        window.addEventListener('keydown', getDirection);
        return () => {
            window.removeEventListener('keydown', getDirection);
        }
    }, [getDirection])

    const renderForm = () => {
        return selectedPattern.pattern.map((row, y) => {
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
        <StyledSelectedPattern pattern={selectedPattern.pattern} position={selectedPattern.position}>
            {renderForm()}
        </StyledSelectedPattern>
    )
}
