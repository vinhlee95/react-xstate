import { Machine } from "xstate";

export const state = {
  idle: "idle",
  fetching: "fetching",
  success: "success",
  error: "error"
};

export const actions = {
  fetchTodos: "fetchTodos",
  cancelFetching: "cancelFetching"
};

export const machine = Machine({
  id: "fetchTodos",
  initial: state.idle,
  context: {
    canFetch: true,
    data: [],
    error: null
  },
  states: {
    idle: {
      on: {
        [actions.fetchTodos]: {
          target: state.fetching, // next target
          cond: "canFetch" // condition to move to the next target state
        }
      }
    },
    fetching: {
      on: {},
      // Invoke service
      invoke: {
        src: "fetchTodos", // source event to invoke
        onDone: {
          target: state.success,
          actions: "saveTodos"
        },
        onError: {
          target: state.error,
          actions: "handleError"
        }
      }
    },
    success: {},
    error: {
      on: {
        [actions.fetchTodos]: state.fetching
      }
    }
  }
});
