import TodoItem from './TodoItem';

function TodoList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty-message">No tasks yet — add one above.</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TodoItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default TodoList;