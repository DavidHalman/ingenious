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

    isGameOver() {
        return (this.state.turn == 91)
    }

    updateScore(hexArray, hex) {
        let q = hex.q + 5
        let r = hex.r + 5
        let s = hex.s + 5

        //initiqlize score to add
        let score = this.state.score
        //get the color o the one that was clicked
        let color = hex.color
        let turn = this.state.turn
        let player = (turn % 2 == 0) ? 0 : 1
        //go through the six directions
        var i;

        //right
        console.log("Right")
        for(i = q + 1; i < 11 && (s + q - i) >= 0; i++){
            console.log(i + " " + r + " " + (s+q-i))
            if(hexArray[i][r][s + q - i] == color){
                score[player][color]++
            } else {
                break
            }
        }

        //left
        console.log("Left")
        for(i = q - 1; i >= 0 && (s + q - i) < 11; i--){
            console.log(i + " " + r + " " + (s+q-i))
            if(hexArray[i][r][s + q - i] == color){
                score[player][color]++
            } else {
                break
            }
        }

        //left up
        console.log("Left Up")
        for(i = r - 1; i >= 0 && (s + r - i) < 11; i--){
            console.log(q + " " + i + " " + (s+r-i))
            if(hexArray[q][i][s + r - i] == color){
                score[player][color]++
            } else {
                break
            }
        }

        //right down
        console.log("Right down")
        for(i = r + 1; i < 11 && (s + r - i) >= 0; i++){
            console.log(q + " " + i + " " + (s + r - i))
            if(hexArray[q][i][s + r - i] == color){
                score[player][color]++
            } else {
                break
            }
        }

        //left down
        console.log("Left Down")
        for(i = q - 1; i >= 0 && (q + r - i) < 11; i--){
            console.log(i + " " + (q + r- i) + " " + s)
            if(hexArray[i][q + r - i][s] == color){
                score[player][color]++
            } else {
                break
            }
        }
        //right up
        console.log("Right Up")
        for(i = q + 1; i < 11 && (q + r - i) >= 0; i++){
            console.log(i + " " + (q + r - i) + " " + s)
            if(hexArray[i][(q + r - i)][s] == color){
                score[player][color]++
            } else {
                break
            }
        }

        //update state of score
        this.setState({
            score,
            turn: turn + 1
        }, () => {
            if (this.isGameOver()){
                alert("The game is over, the winner is Player " + (this.determineWinner()+1))
            }
        })
    }

    determineWinner() {
        var i;
        let score = this.state.score;
        const mins = score.map(element => {
            return Math.min.apply(null, element)
        })
        let min = Math.max.apply(null, mins)
        return mins.indexOf(min)
    }

    render() {
        return (
            <div className="App">
                <h2>Select grid type and configuration from dropdown.</h2>
                <h3>Turn {this.state.turn}: {(this.state.turn % 2 == 0) ? "Player 1" : "Player 2"}</h3>
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
                    updateScore={(hexArray, hex) => this.updateScore(hexArray, hex)}
                />
                <Scoreboard score={this.state.score}/>
            </div>
        );
    }
}

export default App;