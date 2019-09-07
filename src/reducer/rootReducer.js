import {combineReducers} from 'redux';
import {todosReducer} from './TodoReducer'

export const rootReducer = combineReducers({
    todos: todosReducer
});