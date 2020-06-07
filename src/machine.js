import { Machine, assign } from "xstate";

const todos = [
  {
    id: 1,
    name: "Go to gym",
    done: false
  },
  {
    id: 2,
    name: "Cleaning",
    done: true
  }
];

const fetchTodos = () => {
  console.log("Making request to fetch todos");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(todos);
    }, 200);
  });
};

export const state = {
  idle: "idle",
  fetching: "fetching",
  success: "success",
  error: "error"
};

export const actions = {
  fetchTodos: "fetchTodos"
};

const shouldFetchTodos = (context, event) => {
  return context.canFetch;
};

export const machine = Machine({
  id: "fetchTodos",
  initial: state.idle,
  context: {
    canFetch: false,
    data: [],
    error: null
  },
  states: {
    idle: {
      on: {
        [actions.fetchTodos]: {
          target: state.fetching, // next target
          cond: shouldFetchTodos // condition to move to the next target state
        }
      }
    },
    fetching: {
      invoke: {
        src: fetchTodos, // source event to invoke
        onDone: {
          target: state.success,
          actions: assign({
            data: (context, event) => event.data
          })
        },
        onError: {
          target: state.error,
          actions: assign({
            error: (context, event) => ({
              message: event.data
            })
          })
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
