import React from "react";

// import Todo from "./Todo";
import classes from "./TodoList.module.css";

const TodoList = ({ todos, onDeleteItem }) => {
  return (
    <ul className={classes["todos-list"]}>
      {todos.map((todo) => (
        <li
          className={classes.todo}
          key={todo.id}
          onClick={() => onDeleteItem(todo.id)}
        >
          <h2 className={classes.categories}>{todo.category}</h2>
          <p className={classes.texts}>{todo.text}</p>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
