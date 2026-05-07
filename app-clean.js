import {
  createInitialState,
  addTask,
  toggleTask,
  removeTask,
  changeFilter,
  getFilteredTasks
} from "./src/task-service.js";

const MESSAGES = {
  EMPTY_TASK: "Digite algo"
};

let state = createInitialState();

const elements = {
  taskInput: null,
  addButton: null,
  taskList: null,
  filterButtons: null
};

document.addEventListener("DOMContentLoaded", initializeApp);

function initializeApp() {
  cacheElements();
  bindEvents();
  renderTasks();
}

function cacheElements() {
  elements.taskInput = document.getElementById("t");
  elements.addButton = document.getElementById("b");
  elements.taskList = document.getElementById("list");
  elements.filterButtons = document.getElementsByClassName("f");
}

function bindEvents() {
  elements.addButton.addEventListener("click", handleAddTask);

  Array.from(elements.filterButtons).forEach(button => {
    button.addEventListener("click", () => {
      const selectedFilter = button.getAttribute("data-f");

      state = changeFilter(state, selectedFilter);
      renderTasks();
    });
  });
}

function handleAddTask() {
  const previousTaskCount = state.tasks.length;

  state = addTask(state, elements.taskInput.value);

  if (state.tasks.length === previousTaskCount) {
    alert(MESSAGES.EMPTY_TASK);
    return;
  }

  elements.taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  elements.taskList.innerHTML = "";

  getFilteredTasks(state).forEach(task => {
    elements.taskList.appendChild(createTaskElement(task));
  });
}

function createTaskElement(task) {
  const listItem = document.createElement("li");

  if (task.completed) {
    listItem.className = "done";
  }

  listItem.appendChild(createTaskCheckbox(task));
  listItem.appendChild(createTaskDescription(task));
  listItem.appendChild(createDeleteButton(task));

  return listItem;
}

function createTaskCheckbox(task) {
  const checkbox = document.createElement("input");

  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  checkbox.addEventListener("change", () => {
    state = toggleTask(state, task.id);
    renderTasks();
  });

  return checkbox;
}

function createTaskDescription(task) {
  const description = document.createElement("span");

  description.textContent = task.description;

  return description;
}

function createDeleteButton(task) {
  const deleteButton = document.createElement("button");

  deleteButton.textContent = "x";

  deleteButton.addEventListener("click", () => {
    state = removeTask(state, task.id);
    renderTasks();
  });

  return deleteButton;
}