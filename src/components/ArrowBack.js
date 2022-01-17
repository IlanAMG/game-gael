import React from 'react'

export const ArrowBack = ({ rollback }) => {
    return (
        <div onClick={rollback} className='arrowBack'>
            ←
        </div>
    )
}
