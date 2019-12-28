import { createStore, applyMiddleware, compose } from 'redux';
import root from './reducers';
import thunk from 'redux-thunk';
// import saga from "redux-saga"
declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}
const composeA = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(root, composeA(applyMiddleware(thunk)));
export default store;
