import styled from 'styled-components'

const StyledApp =  styled.section`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
        color: #FFFFFF;
        font-size: 64px;
        font-family: sans-serif;
        margin-bottom: 24px;
    }

    button {
        width: 300px;
        height: 96px;
        border-radius: 24px;
        cursor: pointer;
    }

`

export default StyledApp