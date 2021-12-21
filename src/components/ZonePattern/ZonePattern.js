import React, { useState, useEffect } from 'react'
import StyledZonePattern from './StyledZonePattern'
import { Zone } from './components/Zone'
import { Pattern } from './components/Pattern'
import { db } from '../../firebase/Database'

export const ZonePattern = ({ setSelectedPattern }) => {
    const [patterns, setPatterns] = useState([
        {
            
        },
        {
            
        },
        {
            
        },
        {
            
        },
        {
            
        },
        {
            
        },
        {
            
        },
        {
            
        },
        {
            
        },
        {
            
        },
    ])

    useEffect(() => {
        db.collection('players').doc('2').collection('forms').onSnapshot((snap) => {
            const formsSnapShot = snap.docs
            const copyPatterns = [...patterns]
            formsSnapShot.map((form, i) => copyPatterns[i] = form.data())
            setPatterns(copyPatterns)
        })
    }, [])

    return (
        <StyledZonePattern>
            {patterns.map(pattern => <Zone 
                setSelectedPattern={setSelectedPattern}
                withPattern={Object.keys(pattern).length > 0}
                pattern={pattern}
            >
                {Object.keys(pattern).length > 0 && <Pattern pattern={pattern} />}
            </Zone>)}
        </StyledZonePattern>
    )
}
