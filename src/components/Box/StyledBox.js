import styled, { css } from "styled-components";
import { theme } from "../../theme";

const StyledBox = styled.div`
  width: 100px;
  height: 100px;
  background: ${({ nbColor }) => (nbColor ? theme[nbColor] : "")};
  cursor: pointer;
  z-index: ${({ nbColor }) => (nbColor === "A" || nbColor === "B" ? 1 : 0)};
`;

export default StyledBox;
