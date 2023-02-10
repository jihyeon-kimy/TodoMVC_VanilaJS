import { model } from "./model.js";
import { view } from "./view.js";

const clearFilter = () => {
	const selectedFilter = document.querySelector(".selected");
	selectedFilter.classList.remove("selected");
};

const viewAll = () => {
	clearFilter();
	const selectedFilter = document.querySelector("[href='#/']");
	selectedFilter.className = "selected";

	view.render(model.todos);
};

const viewActive = () => {
	clearFilter();
	const selectedFilter = document.querySelector("[href='#/active']");
	selectedFilter.className = "selected";

	const filteredTodos = model.todos.filter((todo) => todo.active);
	view.render(filteredTodos);
};

const viewCompleted = () => {
	clearFilter();
	const selectedFilter = document.querySelector("[href='#/completed']");
	selectedFilter.className = "selected";

	const filteredTodos = model.todos.filter((todo) => !todo.active);
	view.render(filteredTodos);
};

export const filterView = {
	viewAll,
	viewActive,
	viewCompleted,
};
