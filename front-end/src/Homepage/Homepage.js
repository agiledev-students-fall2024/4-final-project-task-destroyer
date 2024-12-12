import React, { useState, useEffect } from 'react';
import './Homepage.css';
import { useNavigate } from 'react-router-dom';

function Homepage(){
  const [urgentTasks, setUrgentTasks] = useState([]);
  const nav = useNavigate()

  useEffect(() => {
    const fetchUrgentTasks = async () => {
      const session = window.localStorage.getItem("session_user");
      const sessionParsed = await JSON.parse(session);
      const token = window.localStorage.getItem("token")
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/tasks/urgent/${sessionParsed?._id}`, {
        headers: { 'Content-Type': 'application/json',
                  'Authorization': token
         }
      });
      if (response.status === 401 || response.error === "Invalid token" || response.error === "No token provided") {
        nav('/');
        return;
      }
      const data = await response.json();
      setUrgentTasks(data);
    };
    fetchUrgentTasks();
  }, []);

  const handleTask = (e) => {
    nav('/Tasks')
  }
  const handleCalendar = (e) => {
    nav('/Calendar_monthly')
  }
  const handleGoal = (e) => {
    nav('/Goals')
  }
  const handleSignOut = () => {
    window.localStorage.removeItem("session_user");
    window.localStorage.removeItem("token");
    nav('/Login');
  };
  return (
    <div className="container">
      <h1>Task Destroyer</h1>

      <div className="urgent-tasks">
        {urgentTasks.map((task) => (
          <div className="urgent" key={task._id}>
            {task.name}: due by {new Date(task.due).toLocaleDateString()}
          </div>
        ))}
      </div>

      <div className="menu">
        <button onClick={handleTask} className="menu-btn">Tasks</button>
        <button onClick={handleCalendar} className="menu-btn">Calendars</button>
        <button onClick={handleGoal} className="menu-btn">Goals</button>
        <button onClick={handleSignOut} className="signout-btn">Sign Out</button>
      </div>
    </div>
  );
}

export default Homepage;