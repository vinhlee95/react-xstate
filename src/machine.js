import { Machine } from "xstate";

export const state = {
  idle: "idle",
  fetching: "fetching",
  success: "success",
  error: "error"
};

export const actions = {
  fetchTodos: "fetchTodos",
  cancelFetching: "cancelFetching",
  disableFetching: "disableFetching",
  enableFetching: "enableFetching"
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
        },
        [actions.disableFetching]: {
          actions: "disableFetching"
        },
        [actions.enableFetching]: {
          actions: "enableFetching"
        }
      }
    },
    fetching: {
      on: {
        [actions.cancelFetching]: state.idle
      },
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
    success: {
      on: {
        [actions.fetchTodos]: state.fetching
      }
    },
    error: {
      on: {
        [actions.fetchTodos]: state.fetching
      }
    }
  }
});
