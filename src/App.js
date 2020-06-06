import React from "react";
import { useMachine } from "@xstate/react";

import "./styles.css";
import { machine, state as todoState, actions as todoActions } from "./machine";

export default function App() {
  const [state, send] = useMachine(machine);

  const getTodos = () => {
    send(todoActions.fetchTodos);
  };

  const renderTodos = () => {
    const todos = state.context.data;
    if (todos.length === 0) return null;
    return todos.map(todo => <div key={todo.id}>{todo.name}</div>);
  };

  const isButtonDisabled = state.matches(todoState.fetching);
  return (
    <div className="App">
      <button disabled={isButtonDisabled} onClick={getTodos}>
        Get todos
      </button>
      {renderTodos()}
    </div>
  );
}
