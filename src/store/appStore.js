import {createStore, applyMiddleware} from 'redux';
import { rootReducer } from '../reducer/rootReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));