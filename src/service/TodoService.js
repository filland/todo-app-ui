const todos = [
  {
    id: 1,
    title: "JUST DO IT",
    description: "sode description",
    isDone: false,
    shouldShowFullTodo: false
  },
  {
    id: 2,
    title: "JUST DO IT",
    description: "sode description",
    isDone: false,
    shouldShowFullTodo: false
  },
  {
    id: 3,
    title: "JUST DO IT",
    description: "sode description",
    isDone: false,
    shouldShowFullTodo: false
  }
];

const TodoService = {
  fetchTodos: () => {
    return todos;
  },
  fetchOneTodo: todoID => {
    let result;
    todos.forEach(todo => {
      if(todo.id == todoID){
        result = todo;
      }
    });
    return result;
  }
};

export default TodoService;