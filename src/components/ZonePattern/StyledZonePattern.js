import styled from 'styled-components'

const StyledZonePattern = styled.div`
    width: 300px;
    height: 800px;
    background: #b8beca99;
    margin-left: 24px;
    display: flex;
    flex-wrap: wrap;
    border-radius: 12px;
    padding: 12px;
    
        .zone {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50%;
            height: 138px;
            cursor: pointer;
            &:hover {
                background: #19335a6a;
            }
        }

        .pattern {
            background: #ffffff;
            width: 80px;
            height: 80px;
            border-radius: 50%;
        }
`

export default StyledZonePattern