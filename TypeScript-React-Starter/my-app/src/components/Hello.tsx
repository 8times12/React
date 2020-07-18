import * as React from 'react';
import './Hello.css';

export interface Props {
    name: string;
    enthusiasmLevel?: number;
}

interface State {
    currentEnthusiam: number;
}

class Hello extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            currentEnthusiam: props.enthusiasmLevel || 1
        };
    }

    onIncrement = () => this.updateEnthusiam(this.state.currentEnthusiam + 1);
    onDecrement = () => this.updateEnthusiam(this.state.currentEnthusiam - 1);

    render() {
        const {
            name,
            enthusiasmLevel = 1
        } = this.props;

        if (enthusiasmLevel <= 0) {
            throw new Error('熱狂度合いが足りないんじゃないかい？( ﾟДﾟ)');
        }

        return (
            <div className="hello">
                <div className="greeting">
                    {name}さん、いらっしゃい{getExclamationMarks(enthusiasmLevel)}
                </div>
                <button onClick={this.onDecrement}>-</button>
                <button onClick={this.onIncrement}>+</button>
            </div>
        )
    }

    updateEnthusiam(currentEnthusiam: number) {
        this.setState({
            currentEnthusiam
        });
    }
}

export default Hello;

function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('！');
}