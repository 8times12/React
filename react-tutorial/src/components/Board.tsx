import React from "react";
import Square from "./Square";
import './Board.scss';
import { BoardFace } from "../types";

export interface Props {
    squares: BoardFace;
    onCheck: (i: number) => void;
    currentChecked: number | null;
}

class Board extends React.Component<Props> {
    renderSquare(i: number) {
        return (
            <Square checker={this.props.squares[i]} onCheck={() => this.props.onCheck(i)} isCurrChecked={this.isCurrChecked(i)} />
        );
    }

    isCurrChecked(i: number): boolean {
        return i === this.props.currentChecked;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default Board;
