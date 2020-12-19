import React from "react";
import { Square } from "./Square";

class Board extends React.Component {

    renderSquare(i) {
        let [a, b, c] = this.props.wSquares;
        let winner;
        if (i === a || i === b || i === c) {
            winner = true;
        } else {
            winner = false;
        }
        return <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            isWinner={winner} />;
    }

    render() {
        const row = [];
        let col = [];
        let k = -1;
        for (let i = 0; i < 3; i++) {
            col = [];
            for (let j = 0; j < 3; j++) {
                k++;
                col.push(this.renderSquare(k));
            }
            row.push(<div className="board-row">{col}</div>);
        }
        return <div>{row}</div>;

    }
}

export default Board;