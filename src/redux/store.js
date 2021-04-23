import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import resturantReducer from './reducers';

const rootReducer = combineReducers({ resturantReducer });

export const store = createStore(rootReducer, applyMiddleware(thunk));