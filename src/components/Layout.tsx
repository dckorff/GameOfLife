import * as React from 'react';
import * as ReactDOM from "react-dom";
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import WorldContainer from "./WorldContainer";

let thing = combineReducers({
	function(state = {}){return state;}
});
console.log('thing')
console.log(thing)

let store = createStore(thing);

ReactDOM.render(
  <Provider store={store}>


		<WorldContainer />

	</Provider>,
  document.getElementById("app")
);