import { API_ROOT_URL as apiRootUrl } from "./constants";
import { addAuthorizationHeader } from "./AuthUtils";

class TodoServiceImp {
  addAuthorizationHeader(headers) {
    addAuthorizationHeader(headers);
  }

  addTodo = (todo, addTodoCallback) => {
    const url = apiRootUrl + "/todos";

    let headers = {
      "Content-Type": "application/json; charset=UTF-8"
    };
    this.addAuthorizationHeader(headers);

    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(todo)
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        todo.id = json;
        addTodoCallback(todo);
      })
      .catch(function(e) {
        console.error(e);
      });
  };

  fetchTodos = (page, limit, fetchTodosCallback) => {
    const url = apiRootUrl + `/todos/?page=${page}&limit=${limit}`;

    let headers = {};
    this.addAuthorizationHeader(headers);

    fetch(url, {
      method: "GET",
      headers: headers
    })
      .then(function(response) {
        return response.text();
      })
      .then(json => {
        let todos = JSON.parse(json);
        todos.sort(function(a, b) {
          return a.id > b.id ? -1 : b.id > a.id ? 1 : 0;
        });

        fetchTodosCallback(todos);
      })
      .catch(e => {
        console.error("error while fetching todods");
        fetchTodosCallback(null);
      });
  };

  fetchOneTodo = (todoId, fetchOneTodoCallback) => {
    const url = apiRootUrl + `/todos/${todoId}`;

    let headers = {};
    this.addAuthorizationHeader(headers);

    fetch(url, {
      method: "GET",
      headers: headers
    })
      .then(function(response) {
        return response.text();
      })
      .then(json => {
        let todo = JSON.parse(json);

        // add some delay to simulate loading
        // setInterval(() => {
        fetchOneTodoCallback(todo);
        // }, FAKE_LATENCY_MILLS);
      })
      .catch(function(e) {
        console.error(e);
      });
  };

  updateTodo = (newTodo, updateTodoCallback) => {
    const url = apiRootUrl + `/todos/${newTodo.id}`;

    let headers = {
      "Content-Type": "application/json; charset=UTF-8"
    };
    this.addAuthorizationHeader(headers);

    fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(newTodo)
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(updatedTodo) {
        updateTodoCallback(updatedTodo);
      })
      .catch(function(e) {
        console.error(e);
      });
  };

  deleteTodo = (todoId, deleteTodoCallback) => {
    const url = apiRootUrl + `/todos/${todoId}`;

    let headers = {};
    this.addAuthorizationHeader(headers);

    fetch(url, {
      method: "DELETE",
      headers: headers
    }).then(function(response) {
      if (response.status === 200) {
        deleteTodoCallback();
      }
    })
    .catch(function(e) {
      console.error(e);
    });
  };
}

const TodoService = new TodoServiceImp();

export default TodoService;
