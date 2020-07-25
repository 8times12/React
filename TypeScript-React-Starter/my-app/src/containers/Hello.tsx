import Hello, { Props } from '../components/Hello';
import * as actions from '../actions/';
import { StoreState } from "../types";
import { connect, MapStateToPropsParam, MapDispatchToPropsParam } from "react-redux";

export const mapStateToProps: MapStateToPropsParam<Props, Props, StoreState> = state => {
    const { enthusiasmLevel, languageName } = state;
    return {
        enthusiasmLevel,
        name: languageName
    };
}

export const mapDispatchToProps: MapDispatchToPropsParam<actions.EnthusiasmDispatchParams, Props> = dispatch => {
    return {
        onIncrement: () => dispatch(actions.incrementEnthusiasm()),
        onDecrement: () => dispatch(actions.decrementEnthusiasm())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);