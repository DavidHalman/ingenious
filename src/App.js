import React, { Component } from 'react';
import Board from './components/board';
import Scoreboard from './components/scoreboard';
import './components/board.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameSize: 'Two Players',
            nextColor: 0,
            score: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]],
            turn: 0,
        };
    }

    changeType(event) {
        this.setState({ gameSize: event.currentTarget.value });
    }

    getNextColor() {
        this.setState({ nextColor: Math.floor(Math.random() * 6)})
    }

    render() {
        return (
            <div className="App">
                <h2>Select grid type and configuration from dropdown.</h2>
                <div>
                    <strong>Template: </strong><select onChange={(ev) => this.changeType(ev)}>
                        <option name="Two Players">Two Players</option>
                        <option name="Three Players">Three Players</option>
                        <option name="Four Players">Four Players</option>
                    </select>
                </div>
                <hr />
                <div>Next Color is {this.state.nextColor}</div>
                <Board
                    gameSize={this.state.gameSize}
                    nextColor={this.state.nextColor}
                    getNextColor={() => this.getNextColor()}
                />
                <Scoreboard score={this.state.score}/>
            </div>
        );
    }
}

export default App;