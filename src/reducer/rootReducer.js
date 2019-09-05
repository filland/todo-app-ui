import {combineReducers} from 'redux';
import {todosReducer, addTodoReducer} from './TodoReducer'

export const rootReducer = combineReducers({
    todos: todosReducer,
    addedTodo: addTodoReducer
});