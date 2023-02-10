import { model } from "./model.js";
import { controller } from "./controller.js";

const clearList = () => {
	const range = document.createRange();
	range.selectNodeContents(document.querySelector(".todo-list"));
	range.deleteContents();
};

const filters = () => {
	let filteredTodos;

	if (window.location.hash === "#/active") {
		filteredTodos = model.todos.filter((todo) => todo.active);
		return render(filteredTodos);
	}

	if (window.location.hash === "#/completed") {
		filteredTodos = model.todos.filter((todo) => !todo.active);
		return render(filteredTodos);
	}

	return render(model.todos);
};

const render = (todos) => {
	clearList();

	console.log(todos);
	const todoList = document.querySelector(".todo-list");

	if (todos.length != 0) {
		for (let i = 0; i < todos.length; i++) {
			const li = document.createElement("li");
			const div = document.createElement("div");
			const toggle = document.createElement("input");
			const label = document.createElement("label");
			const button = document.createElement("button");

			div.className = "view";
			li.setAttribute("data-id", todos[i].id);
			label.innerText = todos[i].todo;
			toggle.className = "toggle";
			toggle.setAttribute("type", "checkbox");
			button.className = "destroy";

			label.addEventListener("dblclick", view.editTodo);
			toggle.addEventListener("click", () =>
				controller.completeTodo(todos[i].id)
			);
			button.addEventListener("click", () =>
				controller.deleteTodo(todos[i].id)
			);

			if (todos[i].active === false) {
				li.className = "completed";
				toggle.setAttribute("checked", "true");
			}

			div.append(toggle, label, button);
			li.append(div);
			todoList.append(li);
		}
	}

	const clearCompletedButton = document.querySelector(".clear-completed");
	const numOfcompletedTodos = model.todos.filter((todo) => !todo.active).length;

	if (numOfcompletedTodos > 0) {
		clearCompletedButton.style.display = "block";
	} else {
		clearCompletedButton.style.display = "none";
	}

	const todoCount = document.querySelector(".todo-count");
	const numOfactiveTodo = model.todos.filter((todo) => todo.active).length;
	todoCount.firstChild.innerHTML = numOfactiveTodo;
};

function addTodo() {
	const input = document.querySelector(".new-todo");
	if (event.target.value.trim() && event.key === "Enter") {
		controller.addTodo(event.target.value);
		input.value = null;
	}
}

const editTodo = () => {
	const li = event.target.parentNode.parentNode;
	const index = li.dataset.id;
	const input = document.createElement("input");

	li.className = "editing";
	input.value = event.target.innerText;
	input.className = "edit";
	input.addEventListener("blur", () =>
		controller.editTodo(index, event.target.value)
	);

	li.append(input);
	input.focus();
};

export const view = { filters, render, addTodo, editTodo };
