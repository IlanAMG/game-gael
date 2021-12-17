import React, { useState } from 'react'
import StyledBox from './StyledBox'

const Box = ({x, y, nbColor, handleMouseDown, handleMouseUp}) => {
    const position = {x, y}

    return (
        <StyledBox
            nbColor={nbColor}
            onMouseDown={(e) => handleMouseDown(e, nbColor, position)}
            onMouseUp={(e) => handleMouseUp(e, nbColor, position)}
        />
    )
}

export default Box;
