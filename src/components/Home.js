import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <>
                <h1>
                    GAME GAEL
                </h1>

                <button
                    onClick={() => this.props.handleStart()}
                >
                    START
                </button>
            </>
        );
    }
}

export default Home;