import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <>
                <h1 style={this.props.player === "2" ? { color: "#000"} : { color: "#FFF" }} id='title'>
                    LINKA
                </h1>

                <button
                    style={this.props.player === '1' ? { border: '3px solid #4faaff', marginBottom: 24} : {marginBottom: 24}}
                    onClick={() => this.props.onSelectPlayer({name: 'player1', id: '1' })}
                >
                    PLAYER 1
                </button>
                <button
                    style={this.props.player === '2' ? { border: '3px solid #4faaff'} : null}
                    onClick={() => this.props.onSelectPlayer({name: 'player2', id: '2', forms: [] })}
                >
                    PLAYER 2
                </button>
            </>
        );
    }
}

export default Home;