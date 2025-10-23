import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from '../Components/TaskList';
import TaskForm from '../Components/TaskForm';

export default function Dashboard({ token }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      alert('Failed to fetch tasks, L user tbh');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Your Tasks</h1>
      <TaskForm token={token} onTaskAdded={fetchTasks} />
      <TaskList tasks={tasks} token={token} onTaskUpdated={fetchTasks} />
    </div>
  );
}
