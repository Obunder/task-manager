import axios from 'axios';
import { API_BASE_URL } from '../config';

export default function TaskList({ tasks, token, onTaskUpdated }) {
  const toggleDone = async (task) => {
    try {
      await axios.put(`${API_BASE_URL}/api/tasks/${task.id}`, {
        ...task,
        done: !task.done,
      }, { headers: { Authorization: `Bearer ${token}` }});
      onTaskUpdated();
    } catch (err) {
      alert('Failed to update task. Please try again.');
    }
  };

  const deleteTask = async (task) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/tasks/${task.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onTaskUpdated();
    } catch (err) {
      alert('Failed to delete task. Typical.');
      alert('Failed to delete task. Please try again.');
    }
  };

  if (!tasks.length) {
    return <p>No tasks yet. Add your first task above!</p>;
  }

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