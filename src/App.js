import React from "react";
import { useMachine } from "@xstate/react";

import "./styles.css";
import { machine, state as todoState, actions as todoActions } from "./machine";
import { initMachineOptions } from "./machine-options";

export default function App() {
  const [state, send] = useMachine(machine, initMachineOptions());
  const { canFetch } = state.context;
  const isFetching = state.matches(todoState.fetching);
  const isButtonDisabled = isFetching || !canFetch;

  console.log("State: ", state.value);
  console.log("Can fetch todos", state.context.canFetch);

  const getTodos = () => {
    send(todoActions.fetchTodos);
  };

  const cancelFetching = () => {
    send(todoActions.cancelFetching);
  };

  const toggleFetching = () => {
    if (canFetch) {
      send(todoActions.disableFetching);
    } else {
      send(todoActions.enableFetching);
    }
  };

  const renderTodos = () => {
    const todos = state.context.data;
    if (todos.length === 0) return null;
    return todos.map(todo => <div key={todo.id}>{todo.name}</div>);
  };

  return (
    <div className="App">
      <button disabled={isButtonDisabled} onClick={getTodos}>
        Get todos
      </button>
      <button disabled={!isFetching} onClick={cancelFetching}>
        Cancel
      </button>
      <button onClick={toggleFetching}>
        {canFetch ? "Disable fetching" : "Enable fetching"}
      </button>
      {renderTodos()}
      {state.context.error && (
        <span role="alert">{state.context.error.message}</span>
      )}
    </div>
  );
}
