import styled, { css } from 'styled-components'
import { theme } from '../../theme'

const StyledBox = styled.div`
    width: 100px;
    height: 100px;
    background: ${({ nbColor }) => theme[nbColor]};
    cursor: pointer;
`

export default StyledBox