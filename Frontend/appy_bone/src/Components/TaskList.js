import axios from 'axios';

export default function TaskList({ tasks, token, onTaskUpdated }) {
  const toggleDone = async (task) => {
    try {
      await axios.put(`http://localhost:8080/api/tasks/${task.id}`, {
        ...task,
        done: !task.done,
      }, { headers: { Authorization: `Bearer ${token}` }});
      onTaskUpdated();
    } catch (err) {
      alert('Failed to update task. Typical.');
    }
  };

  const deleteTask = async (task) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${task.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onTaskUpdated();
    } catch (err) {
      alert('Failed to delete task. Typical.');
    }
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
            {task.title}
          </span>
          <button onClick={() => toggleDone(task)}>Toggle</button>
          <button onClick={() => deleteTask(task)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
