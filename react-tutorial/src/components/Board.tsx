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
        const rows: JSX.Element[] = [];
        let index: number = 0;
        for (let col: number = 0; col < 3; col++) {
            const rowInner: JSX.Element[] = [];
            for (let row: number = 0; row < 3; row++) {
                rowInner.push(this.renderSquare(index++));
            }
            const row: JSX.Element = (
                <div className="board-row">
                    {rowInner}
                </div>
            );
            rows.push(row);
        }
        return (
            <div>
                {rows}
            </div>
        );
    }
}

export default Board;
