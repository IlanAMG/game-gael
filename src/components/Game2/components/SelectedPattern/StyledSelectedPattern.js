import styled from 'styled-components'

const StyledSelectedPattern = styled.div`
    width: ${({pattern}) => `${pattern[0].length * 100}px`};
    height: ${({pattern}) => `${pattern.length * 100}px`};
    position: absolute;
    bottom: ${({position}) => `${position.y}px`};
    left: ${({position}) => `${position.x}px`};
    display: flex;
    flex-wrap: wrap;
`

export default StyledSelectedPattern