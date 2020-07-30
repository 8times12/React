import React from "react";
import Board from "./Board";
import './Game.scss';
import { Checkers } from "../constants";
import { BoardHistory, BoardFace, BoardRecord, CheckLocation } from "../types";

export interface Props {

}

export interface State {
    history: BoardHistory;
    stepNumber: number;
    xIsNext: boolean;
    currentChecked: number | null;
    orderDesc: boolean;
}

class Game extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true,
            currentChecked: null,
            orderDesc: false
        };
    }

    handleClick(i: number): void {
        const history: BoardHistory = this.state.history.slice(0, this.state.stepNumber + 1);
        const current: BoardRecord = history[history.length - 1];
        const squares: BoardFace = [...current.squares];
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? Checkers.X : Checkers.O;
        this.setState({
            history: [...history, {
                squares: squares
            }],
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            currentChecked: i
        });
    }

    jumpTo(step: number): void {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }

    toggleOrder(): void {
        this.setState({
            orderDesc: !this.state.orderDesc
        });
    }

    render() {
        const {history, orderDesc} = this.state;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const toggle = (
            <h3>
                <button onClick={() => this.toggleOrder()}>↑↓</button>
            </h3>
        );

        let moves = history.map((step, move) => {
            const desc = (() => {
                if (move) {
                    const {x, y} = obtainMoveLocation(history, move);
                    return `Go to move #${move}: (${x}, ${y})`;
                } else {
                    return `Go to game start`;
                }
            })();
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        });
        if (orderDesc) {
            moves = moves.reverse();
        }

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
                    <Board squares={current.squares} onCheck={(i) => this.handleClick(i)} currentChecked={this.state.currentChecked} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>
                        {toggle}
                        {moves}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Game;

function calculateWinner(squares: BoardFace) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}

function obtainMoveLocation(history: BoardHistory, step: number): CheckLocation {
    const targetFace: BoardFace = [...history[step].squares];
    let locationIndex: number = 0;
    if (step === 0 && history.length === 1) {
        locationIndex = targetFace.findIndex((checker) => checker !== null);
    } else {
        const prevFace: BoardFace = [...history[step - 1].squares];
        locationIndex = targetFace.findIndex((checker, location) => checker !== null && prevFace[location] == null);
    }
    return {
        x: locationIndex % 3 + 1,
        y: Math.floor(locationIndex / 3) + 1 
    };
}
