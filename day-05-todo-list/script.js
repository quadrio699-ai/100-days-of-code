const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  } catch (error) {
    console.error('Corrupted task data in localStorage, resetting.', error);
    return [];
  }
}

let tasks = loadTasks();

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = '';

  if (tasks.length === 0) {
    const emptyMsg = document.createElement('li');
    emptyMsg.textContent = 'No tasks yet — add one above.';
    emptyMsg.style.color = '#64748b';
    emptyMsg.style.justifyContent = 'center';
    list.appendChild(emptyMsg);
    return;
  }

  tasks.forEach((task) => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = task.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);

    span.addEventListener('click', () => toggleTask(task.id));
    deleteBtn.addEventListener('click', () => deleteTask(task.id));
  });
}

function addTask(text) {
  tasks.push({ id: Date.now(), text, completed: false });
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const taskText = input.value.trim();
  if (taskText === '') return;

  addTask(taskText);
  input.value = '';
});

renderTasks();