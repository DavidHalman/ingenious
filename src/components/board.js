import React, { Component } from 'react'
import { HexGrid, Layout, Hexagon } from 'react-hexgrid';
import './board.css';

class Board extends Component {
    render() {
        return (
            <HexGrid width={1200} height={800} viewBox="-50 -50 100 100">
                <Layout size={{ x: 10, y: 10 }} flat={true} spacing={1.1} origin={{ x: 0, y: 0 }}>
                    <Hexagon q={0} r={-1} s={0} />
                    <Hexagon q={0} r={0} s={1} />
                    <Hexagon q={0} r={1} s={0} />
                    <Hexagon q={1} r={-1} s={0} />
                    <Hexagon q={1} r={0} s={0} />
                    <Hexagon q={-1} r={0} s={0} />
                    <Hexagon q={-1} r={1} s={0} />
                </Layout>
            </HexGrid>
        )
    }
}

export default Board;