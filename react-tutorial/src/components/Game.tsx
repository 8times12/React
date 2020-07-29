import React from "react";
import Board from "./Board";
import './Game.scss';
import { Checkers } from "../constants";
import { calculateWinner } from "../utils";

export interface Props {

}

type Squares = (Checkers | null)[];
export interface State {
    history: {squares: Squares}[];
    stepNumber: number;
    xIsNext: boolean;
}

class Game extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true
        };
    }

    handleClick(i: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = [...current.squares];
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? Checkers.X : Checkers.O;
        this.setState({
            history: [...history, {
                squares: squares
            }],
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step: number) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }

    render() {
        const {history} = this.state;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                `Go to move #${move}` :
                `Go to game start`;
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        });

        const nextPlayer = this.state.xIsNext ? Checkers.X.toString() : Checkers.O.toString();
        const status = (() => {
            if (winner) {
                return `Winner: ${winner}`;
            } else {
                return `Next player: ${nextPlayer}`;
            }
        })();

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onCheck={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;
