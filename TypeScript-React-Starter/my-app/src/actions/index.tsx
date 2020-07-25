import * as constants from '../constants';
import { Action } from 'redux';

export interface IncrementEnthusiasm extends Action { type: constants.INCREMENT_ENTHUSIASM; }

export interface DecrementEnthusiasm extends Action { type: constants.DECREMENT_ENTHUSIASM; }

export type EnthusiasmAction = IncrementEnthusiasm | DecrementEnthusiasm;

export type EnthusiasmActionCreator = () => EnthusiasmAction;

export type EnthusiasmDispatchParams = {[paramName: string]: () => EnthusiasmAction};

export const incrementEnthusiasm:EnthusiasmActionCreator = () => {
    return { type: constants.INCREMENT_ENTHUSIASM }
}

export const decrementEnthusiasm:EnthusiasmActionCreator = () => {
    return { type: constants.DECREMENT_ENTHUSIASM }
}
