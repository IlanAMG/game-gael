import styled from 'styled-components'
import { theme } from '../../../../theme'

const StyledBox = styled.div`
    width: 20px;
    height: 20px;
    background: ${({ nbColor }) => nbColor === 0 ? 'transparent' : "grey"};
    cursor: pointer;
`

export default StyledBox