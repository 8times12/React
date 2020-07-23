import * as constants from '../constants';
import { Action } from 'redux';

export interface IncrementEnthusiasm extends Action { type: constants.INCREMENT_ENTHUSIASM; }

export interface DecrementEnthusiasm extends Action { type: constants.DECREMENT_ENTHUSIASM; }

export type EnthusiasmAction = IncrementEnthusiasm | DecrementEnthusiasm;

export function incrementEnthusiasm(): IncrementEnthusiasm {
    return { type: constants.INCREMENT_ENTHUSIASM }
}

export function decrementEnthusiasm(): DecrementEnthusiasm {
    return { type: constants.DECREMENT_ENTHUSIASM }
}
