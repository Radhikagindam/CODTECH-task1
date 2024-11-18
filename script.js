const todoForm = document.getElementById("todo-form");
const taskInput = document.getElementById("task");
const dueDateInput = document.getElementById("due-date");
const todoGrid = document.getElementById("todo-grid");
const quoteElement = document.getElementById("quote");

const quotes = [
  "The key to success is to focus on goals, not obstacles.",
  "Don't watch the clock; do what it does. Keep going.",
  "Success is the sum of small efforts repeated day in and day out.",
  "You don't have to be perfect; you just have to be better than yesterday.",
];

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

function addTask(task, dueDate) {
  const card = document.createElement("div");
  card.className = "task-card";

  const taskName = document.createElement("h3");
  taskName.textContent = task;

  const taskDue = document.createElement("p");
  taskDue.textContent = `Due: ${new Date(dueDate).toLocaleString()}`;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", () => handleTaskCompletion(card, task, dueDate));

  card.appendChild(checkbox);
  card.appendChild(taskName);
  card.appendChild(taskDue);

  todoGrid.appendChild(card);
}

function handleTaskCompletion(card, task, dueDate) {
  const checkbox = card.querySelector("input[type='checkbox']");
  
  if (checkbox.checked) {
    // Remove the task after 24 hours
    setTimeout(() => {
      card.remove();
    }, 24 * 60 * 60 * 1000); // 24 hours

    alert(`Task "${task}" has been completed.`);
  }
}

function checkReminders() {
  const now = new Date();
  const taskCards = document.querySelectorAll(".task-card");

  taskCards.forEach((card) => {
    const dueText = card.querySelector("p").textContent;
    const dueDate = new Date(dueText.replace("Due: ", ""));
    const timeDiff = dueDate - now;

    if (timeDiff <= 3 * 60 * 60 * 1000 && timeDiff > 0) {
      const hoursLeft = timeDiff / (60 * 60 * 1000);
      if (hoursLeft <= 1) {
        alert(`Reminder: The task "${card.querySelector("h3").textContent}" is due in 1 hour!`);
      } else if (hoursLeft <= 3) {
        alert(`Reminder: The task "${card.querySelector("h3").textContent}" is due in 3 hours!`);
      }
    }
  });
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = taskInput.value.trim();
  const dueDate = dueDateInput.value;

  if (task && dueDate) {
    addTask(task, dueDate);
    taskInput.value = "";
    dueDateInput.value = "";
  }
});

// Update quote every time the page is loaded
quoteElement.textContent = getRandomQuote();

// Check reminders every minute
setInterval(checkReminders, 60000);
