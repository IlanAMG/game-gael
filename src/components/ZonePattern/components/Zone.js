import React from 'react'

export const Zone = ({ withPattern, pattern, children, setSelectedPattern }) => {

    const selectPattern = () => {
        const formArray = Object.values(pattern).map(el => el)
        setSelectedPattern({
            position: { x: 0, y: 0 },
            pattern: formArray
        })
    }

    return (
        <div onClick={withPattern ? () => selectPattern() : null} className='zone'>
            {children}
        </div>
    )
}
