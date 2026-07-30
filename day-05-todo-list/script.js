const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const taskText = input.value.trim();
  if (taskText === '') return;

  addTask(taskText);
  input.value = '';
});

function addTask(text) {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';

  li.appendChild(span);
  li.appendChild(deleteBtn);
  list.appendChild(li);

  span.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  deleteBtn.addEventListener('click', () => {
    li.remove();
  });
}