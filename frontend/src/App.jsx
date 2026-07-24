import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const API_URL = 'http://8.232.94.206/tasks';

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);

      const data = await response.json();

      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (!title) return;

    try {
      await fetch(API_URL, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          title,
        }),
      });

      setTitle('');

      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleComplete = async (task) => {
    try {
      await fetch(`${API_URL}/${task._id}`, {
        method: 'PUT',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          completed: !task.completed,
        }),
      });

      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app">
      <div className="container">
        <h1>Task Manager</h1>

        <div className="task-input">
          <input
            type="text"
            placeholder="Enter a task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button onClick={addTask}>Add</button>
        </div>

        <div className="task-list">
          {tasks.map((task) => (
            <div className="task-card" key={task._id}>
              <div className="task-left">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task)}
                />

                <span
                  className={
                    task.completed ? 'completed task-text' : 'task-text'
                  }
                >
                  {task.title}
                </span>
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
