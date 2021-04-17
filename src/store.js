import { action, computed, makeObservable, observable } from "mobx";

class Store {
	tasks = [
		{ id: 0, title: "Create todo-react app", done: false },
		{ id: 1, title: "Make a video about it", done: true },
		{ id: 2, title: "Create simple todo-app", done: false },
	];

	constructor() {
		makeObservable(this, {
			tasks: observable,
			activeTasksCount: computed,
			sortedTasks: computed,
			addTask: action,
			deleteTask: action,
			doneTask: action,
		});
	}
	setTasks(payload) {
		this.tasks = payload;
	}

	addTask(task) {
		let tasks = this.tasks;

		tasks.push({
			id: new Date(),
			title: task,
			done: false,
		});

		this.setTasks(tasks);
	}
	doneTask(id) {
		let tasks = this.tasks;
		const index = tasks.map((task) => task.id).indexOf(id);
		tasks[index].done = true;
		this.setTasks(tasks);
	}

	deleteTask(id) {
		this.setTasks(this.tasks.filter((item) => item.id !== id));
	}
	get sortedTasks() {
		return this.tasks
			.slice()
			.sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1));
	}

	get activeTasksCount() {
		return this.tasks.filter((item) => !item.done).length;
	}
}
export default new Store();
