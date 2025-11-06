const addTask = document.createElement("button")
addTask.textContent = "Add task";
addTask.className = "add-task-button";
document.body.appendChild(addTask);

addTask.onclick = () => {
	const task = document.createElement("div");
	task.className = "task";

	const label = document.createElement("span");
	label.className = "task-label";

	let inp = prompt("Enter your task description");
	console.log("[LOG]", inp);
	label.textContent = inp || "Empty task.";
	task.appendChild(label);

	const del = document.createElement("button");
	del.textContent = "❌";
	del.className = "delete-button";
	del.onclick = () => {
		task.remove();
		console.log("[LOG] Task removed.")
	};
	task.appendChild(del);

	const edit = document.createElement("button");
	edit.textContent = "✏️";
	edit.className = "edit-button";
	edit.onclick = () => {
		let inp = prompt("Edit your task:");
		console.log("[LOG]", inp);
		label.textContent = inp || label.textContent;
	};
	task.appendChild(edit);

	document.body.appendChild(task);
	console.log("[LOG] Task added")
};
