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

export const fetchTodos = () => {
  console.log("Making request to fetch todos");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(todos);
    }, 200);
  });
};
