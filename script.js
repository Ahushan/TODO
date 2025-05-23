let tasks = [];
let goals = [];

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  loadGoals();
});

function loadGoals() {
  const storedGoals = JSON.parse(localStorage.getItem("goals"));
  if (storedGoals) {
    goals = storedGoals;
    goals.forEach((goal) => {
      addGoalToDOM(goal.text, goal.completed);
    });
  }
}

function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks) {
    tasks = storedTasks;
    tasks.forEach((task) => {
      addTaskToDOM(task.text, task.completed);
    });
  }
}

function toggleTask(button) {
  const listItem = button.closest("li");
  const status = listItem.querySelector(".status");
  const taskText = listItem.querySelector(".main-val")?.textContent.trim();

  const task = tasks.find((t) => t.text === taskText);
  if (!task) {
    console.error("Task not found:", taskText);
    return;
  }

  task.completed = !task.completed;

  if (task.completed) {
    status.textContent = "Completed";
    status.classList.remove("pending");
    status.classList.add("completed");
  } else {
    status.textContent = "Pending";
    status.classList.remove("completed");
    status.classList.add("pending");
  }

  saveTasks();
}

function toggleGoal(button) {
  const listItem = button.closest("li");
  const status = listItem.querySelector(".status");
  const goalText = listItem.querySelector(".main-val")?.textContent.trim();

  const goal = goals.find((t) => t.text === goalText);
  if (!goal) {
    console.error("Goal not found:", goalText);
    return;
  }

  goal.completed = !goal.completed;

  if (goal.completed) {
    status.textContent = "Completed";
    status.classList.remove("pending");
    status.classList.add("completed");
  } else {
    status.textContent = "Pending";
    status.classList.remove("completed");
    status.classList.add("pending");
  }

  saveGoals();
}

function deleteTask(button) {
  const listItem = button.parentElement.parentElement;
  const taskText = listItem.querySelector(".main-val")?.textContent.trim();
  tasks = tasks.filter((task) => task.text !== taskText);
  listItem.remove();

  saveTasks();
}

function deleteGoal(button) {
  const listItem = button.parentElement.parentElement;
  const goalText = listItem.querySelector(".main-val")?.textContent.trim();

  goals = goals.filter((goal) => goal.text !== goalText);
  listItem.remove();

  saveGoals();
}

function addTask() {
  const input = document.querySelector(".list-input");
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const newTask = {
    text: taskText,
    completed: false,
  };

  tasks.push(newTask);
  addTaskToDOM(taskText, newTask.completed);
  input.value = "";
  saveTasks();
}

function addGoal() {
  const input = document.querySelector(".goal-input");
  const goalText = input.value.trim();

  if (goalText === "") {
    alert("Please enter a goal.");
    return;
  }

  const newGoal = {
    text: goalText,
    completed: false,
  };

  goals.push(newGoal);
  addGoalToDOM(goalText, goalText.completed);
  input.value = "";
  saveGoals();
}

function addTaskToDOM(taskText, completed) {
  const todoList = document.getElementById("todoList");
  const li = document.createElement("li");
  li.innerHTML = `
        <p class="main-val">${taskText}</p>
        <h3 class="status ${completed ? "completed" : "pending"}">${
    completed ? "Completed" : "Pending"
  }</h3>
        <div class="btns">
            <button class="tick" onclick="toggleTask(this)">
                <span class="material-icons">check</span>
            </button>
            <button class="delete" onclick="deleteTask(this)">
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>
    `;
  todoList.appendChild(li);
}

function addGoalToDOM(goalText, completed) {
  const goalList = document.getElementById("goalList");
  const li = document.createElement("li");
  li.innerHTML = `
        <p class="main-val">${goalText}</p>
        <h3 class="status ${completed ? "completed" : "pending"}">${
    completed ? "Completed" : "Pending"
  }</h3>
        <div class="btns">
            <button class="tick" onclick="toggleGoal(this)">
                <span class="material-icons">check</span>
            </button>
            <button class="delete" onclick="deleteGoal(this)">
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>
    `;
  goalList.appendChild(li);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function saveGoals() {
  localStorage.setItem("goals", JSON.stringify(goals));
}
