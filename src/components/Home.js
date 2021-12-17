import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <>
                <h1>
                    GAME GAEL
                </h1>

                <button
                    style={{marginBottom: 24}}
                    onClick={() => this.props.onSelectPlayer({name: 'player1', id: '1' })}
                >
                    PLAYER 1
                </button>
                <button
                    onClick={() => this.props.onSelectPlayer({name: 'player2', id: '2' })}
                >
                    PLAYER 2
                </button>
            </>
        );
    }
}

export default Home;