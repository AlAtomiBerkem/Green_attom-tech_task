import logo from './logo.svg';
import './App.css';

import React, { Component } from "react";
import { observable, computed } from "mobx";
import { observer } from "mobx-react";

class Todo {
  id = Math.random();
  @observable title;
  @observable finished = false;
  constructor(title) {
    this.title = title;
  }
}

class TodoList {
  @observable todos = [];

  @observable filter = "all";

  @computed get todosToDisplay() {
    switch (this.filter) {
      case "finished":
        return this.finishedTodos;
      case "unfinished":
        return this.unfinishedTodos;
      default:
        return this.todos;
    }
  }

  @computed get finishedTodos() {
    return this.todos.filter(todo => todo.finished === true);
  }
  @computed get finishedTodosCount() {
    return this.finishedTodos.length;
  }
  @computed get unfinishedTodos() {
    return this.todos.filter(todo => !todo.finished);
  }
  @computed get unfinishedTodosCount() {
    return this.unfinishedTodos.length;
  }
}

const TodoListView = observer(({ todoList }) => {
  return (
    <div>
      <ul>
        {todoList.todosToDisplay.map(todo => (
          <TodoView todo={todo} key={todo.id} />
        ))}
      </ul>
      <br />
      <NewTodoView />
    </div>
  );
});

const TodoView = observer(({ todo }) => (
  <li>
    <input
      type="checkbox"
      checked={todo.finished}
      onClick={() => (todo.finished = !todo.finished)}
    />
    {todo.title}
  </li>
));

class NewTodoView extends Component {
  constructor(props) {
    super(props);
    this.state = { newTodoValue: "" };
    this.handleChange = this.handleChange.bind(this);
    this.addNewTodo = this.addNewTodo.bind(this);
  }

  handleChange = evt => {
    this.setState({ newTodoValue: evt.target.value });
  };

  addNewTodo = () => {
    const newTodo = new Todo(this.state.newTodoValue);
    store.todos.push(newTodo);
    this.setState({ newTodoValue: "" });
  };
}

const TotalCountView = observer(({ todoList }) => {
  return <div>Total Todos in List = {todoList.todos.length}</div>;
});

const FilterView = observer(({ todoList }) => {
  const handleClick = filterValue => {
    todoList.filter = filterValue;
  };
  return (
    <div>
      <span onClick={() => handleClick("all")}>All </span>
      <span onClick={() => handleClick("finished")}>Finished </span>
      <span onClick={() => handleClick("unfinished")}>Unfinished</span>
    </div>
  );
});

const store = new TodoList();
ReactDOM.render(
  <TodoListView todoList={store} />,
  document.getElementById("root")
);
ReactDOM.render(
  <TotalCountView todoList={store} />,
  document.getElementById("root2")
);

ReactDOM.render(
  <FilterView todoList={store} />,
  document.getElementById("root3")
);

store.todos.push(
  new Todo("Get Coffee"),
  new Todo("Write simpler code"),
  new Todo("Learn Mobx"),
  new Todo("Start liking React")
);

store.todos[0].finished = true;
store.todos[1].finished = true;



function App() {
  return (
        <div>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.newTodoValue}
          />
          <button onClick={this.addNewTodo}>Add New Todo</button>
          <br />
        </div>
  );
}

export default App;
