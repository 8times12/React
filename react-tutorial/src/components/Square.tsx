import React from "react";
import './Square.scss';
import { Checkers } from "../constants";

export interface Props {
    checker: Checkers | null;
    onCheck: () => void;
}

function Square(props: Props) {
    return (
        <button className="square" onClick={props.onCheck}>
            {props.checker?.toString()}
        </button>
    )
}

export default Square;
