export const GET_TODOS_REQUEST = "GET_TODOS_REQUEST";
export const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
export const GET_TODOS_FAIL = "GET_TODOS_FAIL";

const initialLoadTodosState = {
  todos: [],
  areLoading: false
};

export function loadTodosReducer(state = initialLoadTodosState, action) {
  switch (action.type) {
    case GET_TODOS_REQUEST:
      return Object.assign({}, state, { areLoading: true });
    case GET_TODOS_SUCCESS:
        console.log(GET_TODOS_SUCCESS+ "    executing");
        
        return Object.assign({}, state, {
        todos: action.payload,
        areLoading: false
      });
    case GET_TODOS_FAIL:
      return Object.assign({}, state, {
        areLoading: false,
        error: "Error while loading todos."
      });
    default:
        console.log("returning default todos");
        
      return state;
  }
}

export const ADD_TODO_REQUEST = "ADD_TODO";
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
export const ADD_TODO_FAIL = "ADD_TODO_FAIL";

const initialAddTodoState = {
  todo: null,
  isAdding: false
};

export function addTodoReducer(state = initialAddTodoState, action) {
  switch (action.type) {
    case ADD_TODO_REQUEST:
      return Object.assign({}, state, { isAdding: true });
    case ADD_TODO_SUCCESS:
      return Object.assign({}, state, {
        isAdding: false,
        todo: action.payload
      });
    case ADD_TODO_FAIL:
      return Object.assign({}, state, {
        isAdding: false,
        error: "Error. This todo was not added."
      });
    default: return state;
  }
}
