import styled, { css } from "styled-components";
import { theme } from "../../theme";

const StyledBox = styled.div`
  width: 100px;
  height: 100px;
  background-image: ${({ nbColor }) => (nbColor ? `url(/static/${theme[nbColor]}fixe.gif)` : "")};
  background-color: ${({ nbColor, player2 }) => (nbColor === "A" || nbColor === "B" || nbColor === 0 ? (player2 && nbColor === 0) ? "#FFF" : theme[nbColor] : "")};
  cursor: pointer;
  z-index: ${({ nbColor }) => (nbColor === "A" || nbColor === "B" ? 1 : 0)};
  border-radius: ${({ nbColor }) => (nbColor === "A" || nbColor === "B" ? "12px" : 0)};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  ${({player2}) => player2 && css`
    &.player2 {
      background-image: none !important;
      background-color: ${({ nbColor }) => (nbColor !== "A" && nbColor !== "B" && nbColor !== 0 ? "#797979" :  nbColor === 0 ? "transparent" : "")} !important;
    }
  `}

  ${({down}) => down && css`
    background-image: ${({ nbColor }) => (nbColor ? `url(/static/${theme[nbColor]}up.gif)` : "")};
  `}

  ${({fixUp}) => fixUp && css`
  background-image: ${({ nbColor }) => (nbColor ? `url(/static/${theme[nbColor]}fixe.gif)` : "")} !important;

  `}
  ${({fixDown}) => fixDown && css`
  background-image: ${({ nbColor }) => (nbColor ? `url(/static/${theme[nbColor]}fixe.gif)` : "")} !important;
  `}
  ${({up}) => up && css`
    background-image: ${({ nbColor }) => (nbColor ? `url(/static/${theme[nbColor]}down.gif)` : "")};
  `}

  ${({animateToLeft}) => animateToLeft && css`
    @keyframes toLeft {
      0% {
      transform: translateX(0px);
      }
      50% {
        transform: translateX(-12%);
      }
      100% {
        transform: translateX(0px);    
      }
    }
    position: relative;
    background: #000000;
    &::after {  
      width: 100px;
      height: 100px;
      background-image: ${({ nbColor }) => (nbColor ? `url(/static/${theme[nbColor]}fixe.gif)` : "")};
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      content: "";
      position: absolute;
      animation: ease-out infinite;
      animation-name: toLeft;
      animation-duration: 1.2s;
    }
  `}

  ${({highlight}) => highlight && css`
    @keyframes highlight {
      0% {
      transform: scale(0.85);
      box-shadow: 0 0 0 0 rgba(84, 134, 150, 0.7);
      }

      70% {
        transform: scale(1);
        box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
      }

      100% {
        transform: scale(0.85);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
      }
    }
    position: relative;
    background: #FFF;

    &::after {  
      background: #cce7e59b;
      width: 100px;
      border-radius: 50px;
      height: 100px;
      content: "";
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
      transform: scale(1);
      position: absolute;
      animation: highlight 2s infinite;
    }
  `} 
`;

export default StyledBox;
