import {combineReducers} from 'redux';
import {loadTodosReducer, addTodoReducer} from './TodoReducer'

export const rootReducer = combineReducers({
    todos: loadTodosReducer,
    addedTodo: addTodoReducer
});