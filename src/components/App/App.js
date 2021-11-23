import React from 'react'
import StyledApp from './StyledApp'
import Game from '../Game/Game'


class App extends React.Component {
    state = {
        isStart: false,
    }

    handleStart() {
        this.setState({ isStart: true })

        // this.setState(() => ({
        //     isStart = true
        // }))
    }

    render() {
        return (
            <StyledApp>
                {
                    this.state.isStart ? 
                        <Game />
                    :
                        <>
                            <h1>
                                GAME GAEL
                            </h1>

                            <button
                                onClick={() => this.handleStart()}
                            >
                                START
                            </button>
                        </>
                }
            </StyledApp>
        )
    }
}

export default App