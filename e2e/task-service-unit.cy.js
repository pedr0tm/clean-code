import {
  FILTERS,
  createInitialState,
  addTask,
  toggleTask,
  removeTask,
  changeFilter,
  getFilteredTasks
} from "../../src/task-service.js";

describe("Task Service - Testes unitários", () => {
  it("deve adicionar uma tarefa", () => {
    let state = createInitialState();

    state = addTask(state, "Estudar Clean Code");

    expect(state.tasks).to.have.length(1);
    expect(state.tasks[0]).to.deep.equal({
      id: 1,
      description: "Estudar Clean Code",
      completed: false
    });
  });

  it("não deve adicionar tarefa vazia", () => {
    let state = createInitialState();

    state = addTask(state, "   ");

    expect(state.tasks).to.have.length(0);
  });

  it("deve alternar conclusão de uma tarefa", () => {
    let state = createInitialState();

    state = addTask(state, "Fazer exercício");
    state = toggleTask(state, 1);

    expect(state.tasks[0].completed).to.equal(true);

    state = toggleTask(state, 1);

    expect(state.tasks[0].completed).to.equal(false);
  });

  it("deve excluir uma tarefa", () => {
    let state = createInitialState();

    state = addTask(state, "Tarefa 1");
    state = addTask(state, "Tarefa 2");

    state = removeTask(state, 1);

    expect(state.tasks).to.have.length(1);
    expect(state.tasks[0].description).to.equal("Tarefa 2");
  });

  it("deve filtrar todas as tarefas", () => {
    let state = createInitialState();

    state = addTask(state, "Tarefa pendente");
    state = addTask(state, "Tarefa concluída");
    state = toggleTask(state, 2);

    state = changeFilter(state, FILTERS.ALL);

    const filteredTasks = getFilteredTasks(state);

    expect(filteredTasks).to.have.length(2);
  });

  it("deve filtrar tarefas pendentes", () => {
    let state = createInitialState();

    state = addTask(state, "Tarefa pendente");
    state = addTask(state, "Tarefa concluída");
    state = toggleTask(state, 2);

    state = changeFilter(state, FILTERS.ACTIVE);

    const filteredTasks = getFilteredTasks(state);

    expect(filteredTasks).to.have.length(1);
    expect(filteredTasks[0].description).to.equal("Tarefa pendente");
    expect(filteredTasks[0].completed).to.equal(false);
  });

  it("deve filtrar tarefas concluídas", () => {
    let state = createInitialState();

    state = addTask(state, "Tarefa pendente");
    state = addTask(state, "Tarefa concluída");
    state = toggleTask(state, 2);

    state = changeFilter(state, FILTERS.COMPLETED);

    const filteredTasks = getFilteredTasks(state);

    expect(filteredTasks).to.have.length(1);
    expect(filteredTasks[0].description).to.equal("Tarefa concluída");
    expect(filteredTasks[0].completed).to.equal(true);
  });
});