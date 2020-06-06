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

export const machine = Machine({
  id: "fetchTodos",
  initial: state.idle,
  context: {
    data: []
  },
  states: {
    idle: {
      on: {
        [actions.fetchTodos]: state.fetching
      }
    },
    fetching: {
      invoke: {
        src: fetchTodos,
        onDone: {
          target: state.success,
          actions: assign({
            data: (_, event) => event.data
          })
        },
        onError: state.error
      }
    },
    success: {},
    error: {}
  }
});
