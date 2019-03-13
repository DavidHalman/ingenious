import React, { Component } from 'react'
import { HexGrid, Layout, Hexagon, Text, HexUtils, GridGenerator } from 'react-hexgrid';
import configs from '../assets/configuration';
import './board.css';

class Board extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        const config = configs[this.props.gameSize];
        const generator = GridGenerator.getGenerator(config.map);
        const hexagons = generator.apply(this, config.mapProps);
        const size = { x: config.layout.width, y: config.layout.height };
        return (
            <HexGrid width={config.width} height={config.height}>
                <Layout size={size} flat={config.layout.flat} spacing={config.layout.spacing} origin={config.origin}>
                    {
                    // note: key must be unique between re-renders.
                    // using config.mapProps+i makes a new key when the goal template chnages.
                    hexagons.map((hex, i) => (
                        <Hexagon key={config.mapProps + i} q={hex.q} r={hex.r} s={hex.s} className="redHex">
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