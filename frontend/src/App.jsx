import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

// ==========================================
// Original ECS + ALB Backend
// Uncomment this if you want to switch back
// ==========================================

// const API_URL = 'http://task-manager-alb-186907563.us-east-1.elb.amazonaws.com/tasks';


// ==========================================
// AWS Lambda Function URL
// ==========================================

const API_URL = 'https://mi6ugljctvphpzxmshrl5wofue0kzfdw.lambda-url.us-east-1.on.aws/';
  
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

    // ==========================================
    // Original Express Backend
    // ==========================================

    /*
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    */

    // ==========================================
    // AWS Lambda
    // ==========================================

    await fetch(`${API_URL}?id=${id}`, {
      method: 'DELETE',
    });

    fetchTasks();

  } catch (error) {

    console.error('Error deleting task:', error);

  }

};

  const toggleComplete = async (task) => {

  try {

    // ==========================================
    // Original Express Backend
    // ==========================================

    /*
    await fetch(`${API_URL}/${task._id}`, {

      method: 'PUT',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        completed: !task.completed,
      }),

    });
    */

    // ==========================================
    // AWS Lambda
    // ==========================================

    await fetch(`${API_URL}?id=${task._id}`, {

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
