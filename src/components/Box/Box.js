import React, { Component } from 'react'
import StyledBox from './StyledBox'

export default class Box extends Component {
    state = {
        position: {
            x: this.props.x,
            y: this.props.y,
        },
        isActive: false
    }

    handleClick = () => {
        this.setState(() => ({
            isActive: true
        }))
        console.log(this.state.position)
    }

    render() {
        return (
            <StyledBox
                onClick={() => this.handleClick()}
                isActive={this.state.isActive}
            />
        )
    }
}
