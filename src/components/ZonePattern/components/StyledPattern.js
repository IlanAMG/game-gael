import styled from 'styled-components'

const StyledPattern = styled.div`
    width: ${({pattern}) => `${pattern[0].length * 20}px`};
    height: ${({pattern}) => `${pattern.length * 20}px`};
    display: flex;
    flex-wrap: wrap;
`

export default StyledPattern