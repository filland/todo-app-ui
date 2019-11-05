const apiRootUrl = "http://localhost:8080";

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

    // const newID = this.findLatestID();
    // todo.id = newID;
    // this.todos.push(todo);
    // return newID;
  };

  fetchTodos = (page, limit, fetchTodosCallback) => {
    const url =apiRootUrl + `/todos/?page=${page}&limit=${limit}`;
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

  fetchOneTodo = (todoID, fetchOneTodoCallback) =>{
    const url = apiRootUrl + `/todos/${todoID}`;
    fetch(url)
      .then(function(response) {
        return response.text();
      })
      .then(json => {
        // console.log(json);
        let todo = JSON.parse(json);
        fetchOneTodoCallback(todo);
      });
  }

  // fetchOneTodoLocal = todoID => {
  //   let result = null;
  //   this.todos.forEach(todo => {
  //     if (todo.id == todoID) {
  //       result = todo;
  //     }
  //   });
  //   return result;
  // };

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

    // this.todos = this.todos.map(todo => {
    //   if (todo.id == updatedTodo.id) {
    //     todo = updatedTodo;
    //   }
    //   return todo;
    // });
  };

  findLatestID = () => {
    let newID = this.todos[this.todos.length - 1].id + 1;
    return newID;
  };
}

const TodoService = new TodoServiceImp();

export default TodoService;
