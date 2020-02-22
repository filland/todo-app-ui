import {combineReducers} from 'redux';
import {todosReducer} from './TodoReducer'
import {infobarReducer} from './InfobarReducer'
import { authReducer } from './AuthReducer';

export const rootReducer = combineReducers({
    todos: todosReducer,
    infobar: infobarReducer,
    auth: authReducer
});