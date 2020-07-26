import { EnthusiasmAction } from "../actions";
import { StoreState } from "../types";
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from "../constants";
import { Reducer } from "redux";

export const enthusiasm: Reducer<StoreState, EnthusiasmAction> = (state, action) => {
    if (typeof state === 'undefined') {
        throw new Error('State is undefined.');
    }
    switch (action.type) {
    case INCREMENT_ENTHUSIASM:
        return {
            ...state,
            enthusiasmLevel: state.enthusiasmLevel + 1
        };
    case DECREMENT_ENTHUSIASM:
        return {
            ...state,
            enthusiasmLevel: state.enthusiasmLevel - 1
        };
    default:
        return state;
    }
}
