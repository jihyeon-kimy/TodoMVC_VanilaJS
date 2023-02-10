import { model } from "./model.js";
import { view } from "./view.js";

const addTodo = (todo) => {
	const new_todo = {
		id: todo + Math.floor(Math.random() * 100),
		todo: todo,
		active: true,
	};
	const newTodos = model.todos.concat(new_todo);
	model.todos = newTodos;
	view.filters();
};

const editTodo = (todoId, editedTodo) => {
	const newTodos = model.todos.map((todo) =>
		todo.id === todoId ? { ...todo, todo: editedTodo } : todo
	);
	model.todos = newTodos;
	view.filters();
};

const completeTodo = (todoId) => {
	const newTodos = model.todos.map((todo) =>
		todo.id === todoId ? { ...todo, active: !todo.active } : todo
	);
	model.todos = newTodos;
	view.filters();
};

const deleteTodo = (todoId) => {
	const newTodos = model.todos.filter((todo) => todo.id !== todoId);
	model.todos = newTodos;
	view.filters();
};

const clearComplete = () => {
	const filteredTodos = model.todos.filter((todo) => todo.active === true);
	model.todos = filteredTodos;
	view.filters();
};

export const controller = {
	addTodo,
	editTodo,
	completeTodo,
	deleteTodo,
	clearComplete,
};
