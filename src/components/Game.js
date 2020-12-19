import React from 'react';
import { calculateWinner, getWinningSquares } from '../index'
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                row: null,
                column: null,
            }],
            stepNumber: 0,
            xIsNext: true,
            stepSelected: -1,
            isAscending: true,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const square = current.squares.slice();

        if (calculateWinner(square) || square[i]) {
            return;
        }
        square[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: square,
                row: parseInt(i / 3),
                column: parseInt(i % 3),
                isSelected: false
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        })
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            stepSelected: step,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move + ' (' + step.row + ',' + step.column + ')' :
                'Go to game start';
            let btn_class = this.state.stepSelected === move ? "blackButton" : "whiteButton";
            return (
                <li key={move}>
                    <button className={btn_class} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
        if (!this.state.isAscending)
            moves.reverse();

        let status;
        let winningSquares = [];
        if (winner) {
            status = 'Winner is ' + winner;
            winningSquares = getWinningSquares(current.squares);
        } else if(this.state.history.length > 9){
            status = 'No winners';
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        wSquares={winningSquares} />
                </div>
                <div className="game-info" >
                    <div>{status}</div>
                    <button onClick={() => {
                        console.log("Yes Click is happening");
                        this.setState({
                            isAscending: !this.state.isAscending,
                        });
                    }}>{this.state.isAscending ? 'Ascending' : 'Decending'}</button>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;