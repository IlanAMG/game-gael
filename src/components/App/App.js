import React from 'react'
import StyledApp from './StyledApp'
import Game from '../Game/Game'
import Home from '../Home'


class App extends React.Component {
    state = {
        isStart: false,
    }

    handleStart() {
        this.setState({ isStart: true })
    }

    render() {
        return (
            <StyledApp>
                {
                    this.state.isStart ? 
                        <Game />
                    :
                        <Home
                            handleStart={() => this.handleStart()}
                        />
                }
            </StyledApp>
        )
    }
}

export default App