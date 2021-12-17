import React from 'react'
import StyledApp from './StyledApp'
import Game from '../Game/Game'
import Home from '../Home'
import { 
    level1,
    level2,
    level3
} from '../../levels/levels'

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
                        <Game level={level2} />
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