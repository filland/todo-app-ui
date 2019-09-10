class TodoServiceImp {
  constructor() {

    this.todos = [
      {
        id: 1,
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
      },
      {
        id: 2,
        title: "JUST DO IT",
        description: "sode description",
        isDone: false,
        shouldShowFullTodo: false
      }
    ];
  }

  addTodo = todo => {
    const newID = this.findLatestID();
    todo.id = newID;
    this.todos.push(todo);

    return newID;
  };

  fetchTodos = () => {
    this.todos.sort(function(a, b) {
      return a.id > b.id ? -1 : b.id > a.id ? 1 : 0;
    });
    return this.todos.slice();
  };

  fetchOneTodo = todoID => {
    let result = null;
    this.todos.forEach(todo => {
      if (todo.id == todoID) {
        result = todo;
      }
    });
    return result;
  };

  updateTodo = updatedTodo => {
    this.todos = this.todos.map(todo => {
      if (todo.id == updatedTodo.id) {
        todo = updatedTodo;
      }
      return todo;
    });
  };

  findLatestID = () => {
    let newID = this.todos[this.todos.length - 1].id + 1;
    return newID;
  };
}

const TodoService = new TodoServiceImp();

export default TodoService;
