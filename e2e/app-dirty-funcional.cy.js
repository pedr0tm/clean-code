describe("index.html - Testes funcionais", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("deve adicionar uma tarefa", () => {
    cy.get("#t").type("Estudar JavaScript");
    cy.get("#b").click();

    cy.get("#list li").should("have.length", 1);
    cy.get("#list li").first().should("contain.text", "Estudar JavaScript");
  });

  it("deve alternar a conclusão de uma tarefa", () => {
    cy.get("#t").type("Fazer exercícios");
    cy.get("#b").click();

    cy.get("#list li").first().should("not.have.class", "done");

    cy.get("#list li input[type='checkbox']").first().check();

    cy.get("#list li").first().should("have.class", "done");
    cy.get("#list li input[type='checkbox']").first().should("be.checked");
  });

  it("deve excluir uma tarefa", () => {
    cy.get("#t").type("Tarefa para excluir");
    cy.get("#b").click();

    cy.get("#list li").should("have.length", 1);

    cy.get("#list li button").first().click();

    cy.get("#list li").should("have.length", 0);
  });

  it("deve filtrar tarefas pendentes", () => {
    cy.get("#t").type("Tarefa pendente");
    cy.get("#b").click();

    cy.get("#t").type("Tarefa concluída");
    cy.get("#b").click();

    cy.contains("#list li", "Tarefa concluída")
      .find("input[type='checkbox']")
      .check();

    cy.get(".f[data-f='1']").click();

    cy.get("#list li").should("have.length", 1);
    cy.get("#list li").first().should("contain.text", "Tarefa pendente");
    cy.get("#list li").first().should("not.contain.text", "Tarefa concluída");
  });

  it("deve filtrar tarefas concluídas", () => {
    cy.get("#t").type("Tarefa pendente");
    cy.get("#b").click();

    cy.get("#t").type("Tarefa concluída");
    cy.get("#b").click();

    cy.contains("#list li", "Tarefa concluída")
      .find("input[type='checkbox']")
      .check();

    cy.get(".f[data-f='2']").click();

    cy.get("#list li").should("have.length", 1);
    cy.get("#list li").first().should("contain.text", "Tarefa concluída");
    cy.get("#list li").first().should("have.class", "done");
  });

  it("deve mostrar todas as tarefas ao usar o filtro all", () => {
    cy.get("#t").type("Tarefa pendente");
    cy.get("#b").click();

    cy.get("#t").type("Tarefa concluída");
    cy.get("#b").click();

    cy.contains("#list li", "Tarefa concluída")
      .find("input[type='checkbox']")
      .check();

    cy.get(".f[data-f='1']").click();
    cy.get("#list li").should("have.length", 1);

    cy.get(".f[data-f='all']").click();

    cy.get("#list li").should("have.length", 2);
    cy.get("#list").should("contain.text", "Tarefa pendente");
    cy.get("#list").should("contain.text", "Tarefa concluída");
  });
});