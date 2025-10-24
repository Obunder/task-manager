import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TaskList from '../Components/TaskList';
import TaskForm from '../Components/TaskForm';
import { API_BASE_URL } from '../config';

export default function Dashboard({ token }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const fetchTasks = useCallback(async () => {
    if (!token) {
      setTasks([]);
      return;
    }

    try {
      const res = await axios.get(`${API_BASE_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
      setError('');
    } catch (err) {
      alert('Failed to fetch tasks, L user tbh');
      setTasks([]);
      if (err.response?.status === 401) {
        setError('Your session has expired. Please log in again.');
      } else {
        setError('Failed to fetch tasks. Please try again later.');
      }
    }
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (!token) {
    return (
      <div>
        <p>You need to log in to manage your tasks.</p>
        <Link to="/login">Go to login</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Your Tasks</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <TaskForm token={token} onTaskAdded={fetchTasks} />
      <TaskList tasks={tasks} token={token} onTaskUpdated={fetchTasks} />
    </div>
  );
}