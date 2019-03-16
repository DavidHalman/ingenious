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
    "purple"
]

class Board extends Component {
    constructor(props) {
        super(props);
        const config = configs[this.props.gameSize];
        const generator = GridGenerator.getGenerator(config.map);
        let hexagons = generator.apply(this, config.mapProps);
        const size = { x: config.layout.width, y: config.layout.height };
        hexagons = hexagons.map((hex, i) => ({
            q: hex.q,
            r: hex.r,
            s: hex.s,
            color: "grey"
        }))
        this.state = {
            config,
            hexagons,
            size
        }
    }

    changeColor(event, source) {
        const hexagons = this.state.hexagons.map(hex => {
            // Switch pattern only for the hexagon that was clicked
            if (HexUtils.equals(source.state.hex, hex)) {
                // Assign new pattern to _our_ data
                hex.color = colors[this.props.nextColor]
            }

            return hex;
        });
        this.props.getNextColor()
        this.setState({
            hexagons,
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
                            className={hex.color}
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