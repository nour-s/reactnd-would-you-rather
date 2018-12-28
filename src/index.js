import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import users from './reducers/users';
import polls from './reducers/polls';
import thunk from 'redux-thunk'

import { applyMiddleware } from 'redux'

let middleware = applyMiddleware(
  thunk,
)
var reducer = combineReducers(
  {
    users,
    polls
  });

let store = createStore(reducer, middleware);
ReactDOM.render(  <Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
