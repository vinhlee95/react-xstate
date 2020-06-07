import React from "react";
import { useMachine } from "@xstate/react";

import "./styles.css";
import { machine, state as todoState, actions as todoActions } from "./machine";
import { initMachineOptions } from "./machine-options";

export default function App() {
  const [state, send] = useMachine(machine, initMachineOptions());
  console.log("State: ", state.value);

  const getTodos = () => {
    send(todoActions.fetchTodos);
  };

  const cancelFetching = () => {
    send(todoActions.cancelFetching);
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
      <button onClick={cancelFetching}>Cancel</button>
      {renderTodos()}
      {state.context.error && (
        <span role="alert">{state.context.error.message}</span>
      )}
    </div>
  );
}
