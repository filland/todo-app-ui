import {
  API_ROOT_URL as apiRootUrl,
  BASIC_AUTH_CREDS,
  FAKE_LATENCY_MILLS,
  JWT_TOKEN
} from "./Constants";

class TodoServiceImp {
  addAuthorizationHeader(headers) {
    this.addJwtTokenAuthHeader(headers);
  }

  addJwtTokenAuthHeader(headers) {
    headers["Authorization"] = "Bearer " + localStorage.getItem(JWT_TOKEN);
  }

  addBasichAuthHeader(headers) {
    headers["Authorization"] = localStorage.getItem(BASIC_AUTH_CREDS);
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
      .catch(function(e) {});
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
        console.log("error while fetching todods");
        fetchTodosCallback(null);
      });
  };

  fetchOneTodo = (todoID, fetchOneTodoCallback) => {
    const url = apiRootUrl + `/todos/${todoID}`;

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
        setInterval(() => {
          fetchOneTodoCallback(todo);
        }, FAKE_LATENCY_MILLS);
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
      });
  };

  deleteTodo = (todoID, deleteTodoCallback) => {
    const url = apiRootUrl + `/todos/${todoID}`;

    let headers = {};
    this.addAuthorizationHeader(headers);

    fetch(url, {
      method: "DELETE",
      headers: headers
    }).then(function(response) {
      if (response.status === 200) {
        deleteTodoCallback();
      }
    });
  };
}

const TodoService = new TodoServiceImp();

export default TodoService;
