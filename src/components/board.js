import React, { Component } from 'react'
import { HexGrid, Layout, Hexagon, Text, HexUtils, GridGenerator } from 'react-hexgrid';
import configs from '../assets/configuration';
import './board.css';

const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "grey"
]

class Board extends Component {
    constructor(props) {
        super(props);
        const config = configs[this.props.gameSize];
        const generator = GridGenerator.getGenerator(config.map);
        let hexagons = generator.apply(this, config.mapProps);
        const size = { x: config.layout.width, y: config.layout.height };

        let hexArray = new Array(11).fill(6).map(() => new Array(11).fill(6).map(() => new Array(11).fill(6)));
        hexagons = hexagons.map((hex, i) => {
            hexArray[hex.q + 5][hex.r + 5][hex.s + 5] = 6
            return {
                q: hex.q,
                r: hex.r,
                s: hex.s,
                color: 6
            }
        })
        this.state = {
            config,
            hexagons,
            size,
            hexArray,
        }
    }

    changeColor(event, source) {
        let clicked = false
        let clickedHex
        let hexArray = this.state.hexArray
        const hexagons = this.state.hexagons.map(hex => {
            // Switch pattern only for the hexagon that was clicked
            if (HexUtils.equals(source.state.hex, hex)) {
                // Assign new pattern to _our_ data
                if(hex.color != 6){
                    clicked = true

                } else {
                    hex.color = this.props.nextColor
                    hexArray[hex.q + 5][hex.r + 5][hex.s + 5] = hex.color
                    clickedHex = hex
                }
            }

            return hex;
        });
        if (clicked){
            alert("Piece already placed here. Choose a different location.")
            return
        }

        this.props.updateScore(hexArray, clickedHex)
        this.props.getNextColor()
        this.setState({
            hexagons,
            hexArray,
        })
    }

    render() {
        const {config, hexagons, size} = this.state;
        return (
            <HexGrid width={config.width} height={config.height}>
                <Layout size={size} flat={config.layout.flat} spacing={config.layout.spacing} origin={config.origin}>
                    {
                    // note: key must be unique between re-renders.
                    // using config.mapProps+i makes a new key when the goal template chnages.
                    this.state.hexagons.map((hex, i) => (
                        <Hexagon
                            key={config.mapProps + i}
                            q={hex.q}
                            r={hex.r}
                            s={hex.s}
                            className={colors[hex.color]}
                            onClick={(e, s) => this.changeColor(e, s)}
                        >
                            <Text>{HexUtils.getID(hex)}</Text>
                        </Hexagon>
                    ))
                    }
                </Layout>
            </HexGrid>
        )
    }
}

export default Board;