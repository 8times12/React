import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { StoreState } from './types';
import { createStore, Store } from 'redux';
import { enthusiasm } from './reducers';
import { EnthusiasmAction } from './actions';
import { Provider } from 'react-redux';
import Hello from './containers/Hello';

const store: Store<StoreState, EnthusiasmAction> = createStore(enthusiasm, {
    enthusiasmLevel: 1,
    languageName: 'TypeScript'
});

ReactDOM.render(
    <Provider store={store}>
        <Hello />
    </Provider>,
    document.getElementById('root') as HTMLElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
