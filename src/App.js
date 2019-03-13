import React, { Component } from 'react';
import Board from './components/board';
import './components/board.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { gameSize: 'Two Players' };
    }

    changeType(event) {
        this.setState({ gameSize: event.currentTarget.value });
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
                <Board gameSize={this.state.gameSize} />
            </div>
        );
    }
}

export default App;