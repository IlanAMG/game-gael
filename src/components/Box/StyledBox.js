import styled, { css } from 'styled-components'

const StyledBox = styled.div`
    width: 100px;
    height: 100px;
    background: ${(props) => props.isActive ? '#ff0000' : '#FFF'};
    cursor: pointer;
`

export default StyledBox