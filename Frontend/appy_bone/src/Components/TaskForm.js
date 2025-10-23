import { useState } from 'react';
import axios from 'axios';

export default function TaskForm({ token, onTaskAdded }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/tasks', { title }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTitle('');
      onTaskAdded();
    } catch (err) {
      alert('Failed to add task. Pathetic.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="New Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}
