import React from "react";
import './Square.scss';
import { Checkers } from "../constants";

export interface Props {
    checker: Checkers | null;
    onCheck: () => void;
    isCurrChecked: boolean;
}

function Square(props: Props) {
    let classNames = 'square';
    if (props.isCurrChecked) {
        classNames += ' current';
    }
    return (
        <button className={classNames} onClick={props.onCheck}>
            {props.checker}
        </button>
    )
}

export default Square;
