import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import burgerReducer from './store/reducers/burger';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import { watchAuth, watchIngredients, watchOrders} from './store/sagas'

import './index.css';
import App from './components/App';
import {BrowserRouter} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';

const sagaMiddleware = createSagaMiddleware();

// const composeEnhancers = process.env.NODE_ENV === 'developmet' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : null;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;
const rootReducer = combineReducers({
  burgerBuilder : burgerReducer,
  order : orderReducer,
  auth : authReducer
})

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

  sagaMiddleware.run(watchAuth);
  sagaMiddleware.run(watchIngredients);
  sagaMiddleware.run(watchOrders);
const app = (

  <Provider store ={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>

)

ReactDOM.render(
 app , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
