export const FILTERS = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed"
};

export function createInitialState() {
  return {
    tasks: [],
    nextId: 0,
    currentFilter: FILTERS.ALL
  };
}

export function addTask(state, description) {
  const trimmedDescription = description.trim();

  if (!trimmedDescription) {
    return state;
  }

  return {
    ...state,
    nextId: state.nextId + 1,
    tasks: [
      ...state.tasks,
      {
        id: state.nextId + 1,
        description: trimmedDescription,
        completed: false
      }
    ]
  };
}

export function toggleTask(state, taskId) {
  return {
    ...state,
    tasks: state.tasks.map(task => {
      if (task.id !== taskId) {
        return task;
      }

      return {
        ...task,
        completed: !task.completed
      };
    })
  };
}

export function removeTask(state, taskId) {
  return {
    ...state,
    tasks: state.tasks.filter(task => task.id !== taskId)
  };
}

export function changeFilter(state, filter) {
  return {
    ...state,
    currentFilter: filter
  };
}

export function getFilteredTasks(state) {
  if (state.currentFilter === FILTERS.ACTIVE) {
    return state.tasks.filter(task => !task.completed);
  }

  if (state.currentFilter === FILTERS.COMPLETED) {
    return state.tasks.filter(task => task.completed);
  }

  return state.tasks;
}