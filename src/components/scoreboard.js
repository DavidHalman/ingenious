import React, { Component } from 'react';

const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple"
]

class Scoreboard extends Component {

    render() {
        const score = this.props.score
        return (
            <div>
                <div>Player 1:
                    {
                        colors.map((color, i) => {
                            return <div> {color}: {score[0][i]}</div>
                        })
                    }
                </div>
                <div>Player 2:
                    {
                        colors.map((color, i) => {
                            return <div> {color}: {score[1][i]}</div>
                        })
                    }
                </div>
            </div>
        )
    }

}

export default Scoreboard