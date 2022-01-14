import styled from "styled-components";

const StyledWaiting = styled.span`
  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }

    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }
  width: 800px;
  margin: 0 24px;
  border-radius: 16px;
  background: #7372889b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
  font-size: 36px;
  color: rgb(0, 11, 49);
  backdrop-filter: blur(10px);
  padding: 72px 24px;
  position: fixed;
  font-weight: bold;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  transform: scale(1);
  animation: pulse 2s infinite;
`;

export default StyledWaiting;
