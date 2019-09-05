import {combineReducers} from 'redux';
import {loadTodosReducer, addTodoReducer, showFullTodo} from './TodoReducer'

export const rootReducer = combineReducers({
    todos: loadTodosReducer,
    showFullTodo: showFullTodo,
    addedTodo: addTodoReducer
});