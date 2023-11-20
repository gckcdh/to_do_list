// Initialize tasks array
let tasks = [];

// Function to render tasks
function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.className = "flex items-center space-x-2";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            renderTasks();
            updateLocalStorage();
        });

        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        if (task.completed) {
            taskText.className = "line-through text-gray-500";
        }

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "bg-red-500 text-white p-2 rounded";
        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            renderTasks();
            updateLocalStorage();
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });
}

// Function to add a new task
function addTask(text) {
    tasks.push({ text, completed: false });
    renderTasks();
    updateLocalStorage();
}

// Function to update local storage with tasks
function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
const storedTasks = JSON.parse(localStorage.getItem("tasks"));
if (storedTasks) {
    tasks = storedTasks;
    renderTasks();
}

// Add task on button click
const addButton = document.getElementById("addButton");
addButton.addEventListener("click", () => {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        addTask(taskText);
        taskInput.value = "";
    }
});

// Add task on Enter key press
const taskInput = document.getElementById("taskInput");
taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            taskInput.value = "";
        }
    }
});
