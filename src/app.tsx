import * as React from 'react';
import * as ReactDOM from "react-dom";
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducers'
const store = createStore(reducer)

import Layout from "./components/Layout";

// let thing = combineReducers({
// 	function(state = {}){return state;}
// });
// console.log('thing')
// console.log(thing)

// let store = createStore(thing);

ReactDOM.render(
  <Provider store={store}>


		<Layout />

	</Provider>,
  document.getElementById("app")
);