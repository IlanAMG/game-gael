import styled from 'styled-components'

const StyledApp =  styled.section`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
        color: #FFF;
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

    .arrowBack {
        position: absolute;
        right: -120px;
        top: 50%;
        transform: translateY(-50%);
        width: 72px;
        height: 72px;
        color #FFF;
        font-size: 48px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        border-radius: 12px;
        &:hover {
            background-color: #b4b4b43d;
        }
    }

`

export default StyledApp