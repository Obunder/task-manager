import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export default function TaskForm({ token, onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('You must be logged in to add tasks.');
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/api/tasks`, { title }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTitle('');
      setError('');
      onTaskAdded();
    } catch (err) {
      setError('Failed to add task. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="New Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" disabled={!title.trim() || !token}>Add Task</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}