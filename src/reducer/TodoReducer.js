export const ADD_TODO_REQUEST = "ADD_TODO";
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
export const ADD_TODO_FAIL = "ADD_TODO_FAIL";

export const GET_ONE_TODO_REQUEST = "GET_ONE_TODO_REQUEST";
export const GET_ONE_TODO_SUCCESS = "GET_ONE_TODO_SUCCESS";
export const GET_ONE_TODO_FAIL = "GET_ONE_TODO_FAIL";

export const GET_TODOS_REQUEST = "GET_TODOS_REQUEST";
export const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
export const GET_TODOS_FAIL = "GET_TODOS_FAIL";

export const UPDATE_TODO_REQUEST = "UPDATE_TODO_REQUEST";
export const UPDATE_TODO_SUCCESS = "UPDATE_TODO_SUCCESS";

export const DELETE_TODO_REQUEST = "DELETE_TODO_REQUEST";
export const DELETE_TODO_SUCCESS = "DELETE_TODO_SUCCESS";

export const MARK_TODO_AS_DONE_REQUEST = "MARK_TODO_AS_DONE_REQUEST";
export const MARK_TODO_AS_DONE_SUCCESS = "MARK_TODO_AS_DONE_SUCCESS";

export const SET_TODOS_PAGENATION_SUCCESS = "SET_TODOS_PAGENATION_SUCCESS";

const initialLoadTodosState = {
  todos: [],
  areLoading: false,
  isLoadingFullTodo: false,
  isUpdatingTodo: false,
  isMarkingTodoAsDone: false,
  pagination: {
    current: 0,
    size: 10,
    total: null
  }
  // error: null
};

export function todosReducer(state = initialLoadTodosState, action) {
  switch (action.type) {
    case ADD_TODO_REQUEST:
      return Object.assign({}, state, { isAdding: true });
    case ADD_TODO_SUCCESS:
      let newState = Object.assign({}, state);
      let todos = newState.todos;

      let newTodo = action.payload;
      todos.unshift(newTodo);

      return Object.assign({}, state, {
        isAdding: false,
        todos: todos
      });
    case ADD_TODO_FAIL:
      return Object.assign({}, state, {
        isAdding: false
        // ,
        // error: "Error. This todo was not added."
      });
    case GET_ONE_TODO_REQUEST:
      return Object.assign({}, state, { areLoading: true });
    case GET_ONE_TODO_SUCCESS:
      const newState2 = Object.assign({}, state);
      let newTodos = newState2.todos;

      if (newTodos.length > 0) {
        newTodos.forEach(todo => {
          if (todo.id === action.payload.id) {
            todo = action.payload;
          }
        });
      } else {
        newTodos = new Array(action.payload);
      }

      return Object.assign({}, state, {
        todos: newTodos,
        areLoading: false
      });
    case GET_TODOS_REQUEST:
      return Object.assign({}, state, { areLoading: true });
    case GET_TODOS_SUCCESS:
      return Object.assign({}, state, {
        todos: action.payload,
        areLoading: false
      });
    case GET_TODOS_FAIL:
      return Object.assign({}, state, {
        areLoading: false
        // ,
        // error: "Error while loading todos."
      });
    case UPDATE_TODO_REQUEST:
      return Object.assign({}, state, { isUpdating: true });
    case UPDATE_TODO_SUCCESS:
      let stateAfterSuccessTodoUpdate = Object.assign({}, state);
      stateAfterSuccessTodoUpdate.todos.forEach(todo => {
        if (todo.id === action.payload.todo.id) {
          todo = action.payload.todo;
        }
      });
      stateAfterSuccessTodoUpdate.isUpdating = false;
      return stateAfterSuccessTodoUpdate;
    case DELETE_TODO_REQUEST:
      let newState3 = Object.assign({}, state);
      return newState3;
    case DELETE_TODO_SUCCESS:
      let newState4 = Object.assign({}, state);
      newState4.todos.forEach(t => {
        if (t.id === action.payload) {
          t.active = false;
        }
      });
      return newState4;
    case MARK_TODO_AS_DONE_REQUEST:
      return Object.assign({}, state, { isMarkingTodoAsDone: true });
    case MARK_TODO_AS_DONE_SUCCESS:
      let markTodoAsDoneState = Object.assign({}, state);
      markTodoAsDoneState.todos.forEach(todo => {
        if(todo.id === action.payload) {
          todo.done = true;
        }
      })
      return markTodoAsDoneState;
    case SET_TODOS_PAGENATION_SUCCESS:
      let setTodosPageState = Object.assign({}, state);
      setTodosPageState.pagination.current = action.payload.current;
      if(action.payload.size) {
        setTodosPageState.pagination.size = action.payload.size;
      }
      if(action.payload.total) {
        setTodosPageState.pagination.total = action.payload.total;
      }
      return setTodosPageState;
    default:
      return state;
  }
}