// (function (window) {
"use strict";

// Your starting point. Enjoy the ride!

const model = {
	todos: [],
};

const view = {
	clearList: function () {
		const range = document.createRange();
		range.selectNodeContents(document.querySelector(".todo-list"));
		range.deleteContents();
	},

	render: function (todos) {
		this.clearList();

		const todoList = document.querySelector(".todo-list");

		if (todos.length != 0) {
			for (let i = 0; i < todos.length; i++) {
				const li = document.createElement("li");
				const div = document.createElement("div");
				const toggle = document.createElement("input");
				const label = document.createElement("label");
				const button = document.createElement("button");

				div.setAttribute("class", "view");
				li.setAttribute("data-id", i);
				toggle.setAttribute("class", "toggle");
				toggle.setAttribute("type", "checkbox");
				button.setAttribute("class", "destroy");

				label.setAttribute("ondblclick", "view.editTodo()");
				toggle.setAttribute("onclick", `controller.completeTodo(${i})`);
				button.setAttribute("onclick", `controller.deleteTodo(${i})`);

				if (todos[i].active === false) {
					li.setAttribute("class", "completed");
					toggle.setAttribute("checked", "true");
				}
				label.innerText = todos[i].todo;

				div.append(toggle, label, button);
				li.append(div);
				todoList.append(li);
			}
		}
	},

	addTodo: function () {
		const input = document.querySelector(".new-todo");
		if (event.target.value.trim() && event.key === "Enter") {
			controller.addTodo(event.target.value);
			input.value = null;
		}
	},

	editTodo: function () {
		const li = event.target.parentNode.parentNode;
		const index = li.dataset.id;

		li.setAttribute("class", "editing");

		const input = document.createElement("input");
		input.value = model.todos[index].todo;
		input.setAttribute("class", "edit");
		input.setAttribute(
			"onblur",
			`controller.editTodo(${index}, event.target.value)`
		);

		li.append(input);
		input.focus();
	},

	// Filter 관련
	clearFilter: function () {
		const selectedFilter = document.querySelector(".selected");
		selectedFilter.removeAttribute("class");
	},

	allFilter: function () {
		this.clearFilter();

		const selectedFilter = document.querySelector("[href='#/']");
		selectedFilter.setAttribute("class", "selected");

		view.render(model.todos);
	},

	activeFilter: function () {
		this.clearFilter();

		const selectedFilter = document.querySelector("[href='#/active']");
		selectedFilter.setAttribute("class", "selected");

		const active_todos = model.todos.filter((todo) => todo.active);
		view.render(active_todos);
	},

	completeFilter: function () {
		this.clearFilter();

		const selectedFilter = document.querySelector("[href='#/completed']");
		selectedFilter.setAttribute("class", "selected");

		const complete_todos = model.todos.filter((todo) => !todo.active);
		view.render(complete_todos);
	},
};

const controller = {
	addTodo: function (todo) {
		const new_todo = { todo: todo, active: true };
		const new_todos = model.todos.concat(new_todo);
		model.todos = new_todos;
		view.render(new_todos);
	},

	editTodo: function (todo_idx, edited_todo) {
		console.log(edited_todo);
		const new_todos = model.todos.map((todo) =>
			todo === model.todos[todo_idx] ? { ...todo, todo: edited_todo } : todo
		);
		model.todos = new_todos;
		view.render(new_todos);
	},

	completeTodo: function (todo_idx) {
		const new_todos = model.todos.map((todo) =>
			todo === model.todos[todo_idx]
				? { ...todo, active: !model.todos[todo_idx].active }
				: todo
		);
		model.todos = new_todos;
		view.render(new_todos);
	},

	deleteTodo: function (todo_idx) {
		const new_todos = model.todos.filter(
			(todo) => todo !== model.todos[todo_idx]
		);
		model.todos = new_todos;
		view.render(new_todos);
	},
};
// })(window);
