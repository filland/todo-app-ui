const apiRootUrl = "http://localhost:8080/api/v1";

class TodoServiceImp {
  addTodo = (todo, addTodoCallback) => {
    const url = apiRootUrl + "/todos";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo)
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        todo.id = json;
        addTodoCallback(todo);
      });
  };

  fetchTodos = (page, limit, fetchTodosCallback) => {
    const url = apiRootUrl + `/todos/?page=${page}&limit=${limit}`;
    fetch(url)
      .then(function(response) {
        return response.text();
      })
      .then(json => {
        // console.log("result = " + json);
        let todos = JSON.parse(json);
        todos.sort(function(a, b) {
          return a.id > b.id ? -1 : b.id > a.id ? 1 : 0;
        });

        fetchTodosCallback(todos);
      });
  };

  fetchOneTodo = (todoID, fetchOneTodoCallback) => {
    const url = apiRootUrl + `/todos/${todoID}`;
    fetch(url)
      .then(function(response) {
        return response.text();
      })
      .then(json => {
        // console.log(json);
        let todo = JSON.parse(json);
        setInterval(() => {
          fetchOneTodoCallback(todo);
        }, 500);
      });
  };

  updateTodo = (newTodo, updateTodoCallback) => {
    const url = apiRootUrl + `/todos`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTodo)
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(updatedTodo) {
        updateTodoCallback(updatedTodo);
      });
  };
}

const TodoService = new TodoServiceImp();

export default TodoService;
