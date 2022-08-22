import React, { useState, useEffect, useCallback } from "react";

import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  // 화면 불러오고 있는 중에 로딩 표시 처리
  const [isLoading, setIsLoading] = useState(false);
  //에러상태 처리
  const [error, setError] = useState(null);

  //------useCallback을 사용한 경우
  const fetchTodosHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    // try {} catch{}로 오류 처리 해주기
    // GET요청 관련 fetch
    try {
      const response = await fetch(
        "https://udemy-react-http-77f19-default-rtdb.firebaseio.com/todos.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();

      const loadedTodos = [];

      for (const key in data) {
        loadedTodos.push({
          id: key,
          category: data[key].category,
          text: data[key].text,
        });
      }
      setTodos(loadedTodos);
    } catch (error) {
      setError(error.message); // "Something went wrong"
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchTodosHandler();
  }, [fetchTodosHandler]);

  // POST 요청 관련 fetch
  async function addTodoHandler(todo) {
    const response = await fetch(
      "https://udemy-react-http-77f19-default-rtdb.firebaseio.com/todos.json",
      {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data); // 결과값: {name: '-N9a7yhrMvCi1GK_E4-1'} // firebase에서 정한 아이디
  }

  const deleteListHandler = (listId) => {
    setTodos((prevList) => {
      const updatedList = prevList.filter((list) => list.id !== listId);
      return updatedList;
    });
  };

  let content = <p>Found no todos</p>;
  if (todos.length > 0) {
    console.log(todos);
    content = <TodoList todos={todos} onDeleteItem={deleteListHandler} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <div id="form">
      <h1 id="title">TO-DO LIST</h1>
      <section>
        <AddTodo onAddTodo={addTodoHandler} />
      </section>
      <section>
        <button onClick={fetchTodosHandler}>Fetch Todos</button>
      </section>
      <section>{content}</section>
    </div>
  );
}

export default App;
