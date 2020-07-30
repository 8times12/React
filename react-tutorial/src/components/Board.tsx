import React from "react";
import Square from "./Square";
import './Board.scss';
import { BoardFace } from "../types";

export interface Props {
    squares: BoardFace;
    onCheck: (i: number) => void;
    currentChecked: number | null;
    line: [number, number, number] | null
}

class Board extends React.Component<Props> {
    renderSquare(i: number) {
        return (
            <Square
                checker={this.props.squares[i]}
                onCheck={() => this.props.onCheck(i)}
                isCurrChecked={this.isCurrChecked(i)}
                isLine={this.isLine(i)}
                key={i} />
        );
    }

    isCurrChecked(i: number): boolean {
        return this.props.currentChecked === i;
    }

    isLine(i: number): boolean {
        return !!this.props.line?.includes(i);
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
                <div className="board-row" key={col}>
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
