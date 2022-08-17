import React from "react";

// import Todo from "./Todo";
import classes from "./TodoList.module.css";

const TodoList = (props) => {
  return (
    <ul className={classes["todos-list"]}>
      {props.todos.map((todo) => (
        <li
          className={classes.todo}
          key={todo.id}
          onClick={() => props.onDeleteItem(todo.id)}
        >
          <h2 className={classes.categories}>{props.category}</h2>
          <p className={classes.texts}>{props.text}</p>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
