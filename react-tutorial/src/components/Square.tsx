import React from "react";
import './Square.scss';
import { Checkers } from "../constants";

export interface Props {
    checker: Checkers | null;
    onCheck: () => void;
    isCurrChecked: boolean;
    isLine: boolean;
}

function Square(props: Props) {
    let classNames = 'square';
    if (props.isCurrChecked) {
        classNames += ' current';
    }
    if (props.isLine) {
        classNames += ' line';
    }
    return (
        <button className={classNames} onClick={props.onCheck}>
            {props.checker}
        </button>
    )
}

export default Square;
