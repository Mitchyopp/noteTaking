const addTask = document.createElement("button");
addTask.textContent = "Add task";
addTask.className = "add-task-button";
document.body.appendChild(addTask);

const input = document.getElementById("taskInput");

function render(text) {
  const task = document.createElement("div");
  task.className = "task";

  const label = document.createElement("span");
  label.className = "task-label";
  label.textContent = text;
  task.appendChild(label);

  const del = document.createElement("button");
  del.textContent = "❌";
  del.className = "delete-button";
  del.onclick = () => {
    task.remove();
    console.log("[LOG] Task removed.");
    snapshotAndSave();
  };
  task.appendChild(del);

  const edit = document.createElement("button");
  edit.textContent = "✏️";
  edit.className = "edit-button";
  edit.onclick = () => {
    let newText = prompt("Edit your task:", label.textContent);
    if (newText === null) return;
    newText = newText.trim();
    if (!newText) return;
    label.textContent = newText;
    console.log("[LOG] Task edited.");
    snapshotAndSave();
  };
  task.appendChild(edit);

  document.body.appendChild(task);
}

addTask.onclick = () => {
  let inp = input.value.trim();
  console.log(`LOG: ${inp}`);
  render(inp || "Empty note.");
  snapshotAndSave();
  input.value = "";
};

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/load");
    const { tasks } = await res.json();
    (tasks || []).forEach(t => render(String(t)));
  } catch (e) {
    console.warn("No saved tasks yet (or failed to load).");
  }
});
