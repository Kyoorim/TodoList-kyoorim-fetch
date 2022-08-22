import React, { useRef } from "react";

import classes from "./AddTodo.module.css";

function AddTodo(props) {
  const categoryRef = useRef("");
  const textRef = useRef("");

  function submitHandler(event) {
    event.preventDefault();

    const todo = {
      category: categoryRef.current.value,
      text: textRef.current.value,
    };

    const enteredCategoryIsValid = todo.category.trim() !== "";
    const enteredTodoIsValid = todo.text.trim() !== "";

    let formIsValid = false;
    if (enteredCategoryIsValid && enteredTodoIsValid) {
      formIsValid = true;
    }

    if (!formIsValid) {
      return;
    }

    props.onAddTodo(todo);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Category</label>
        <input type="text" id="category" ref={categoryRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="opening-text">Write your to-do</label>
        <textarea rows="5" id="text" ref={textRef}></textarea>
      </div>
      <button>Add Todo</button>
    </form>
  );
}

export default AddTodo;
