import { assign } from "xstate";
import { fetchTodos } from "./todo.services";

export const initMachineOptions = () => ({
  guards: {
    canFetch: (context, event) => context.canFetch
  },
  // Service methods for making API request
  services: {
    fetchTodos: (context, event) => fetchTodos()
  },
  // Actions to update state context
  actions: {
    saveTodos: assign((context, event) => ({
      data: event.data
    })),
    handleError: assign((context, event) => ({
      error: {
        message: event.data
      }
    }))
  }
});
