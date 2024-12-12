import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CreateTask.css';


function CreateTask() {

    const nav = useNavigate()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [subject, setSubject] = useState("")
    const [due_date, setDue_date] = useState("")
    const [priority, setPriority] = useState("Low")
    const [recurring, setRecurring] = useState("No")
    const [recurringPeriod, setRecurringPeriod] = useState("");

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleSubject = (e) => {
        setSubject(e.target.value)
    }

    const handleDue_date = (e) => {
        setDue_date(e.target.value)
    }

    const handlePriority = (e) => {
        setPriority(e.target.value)
    }

    const handleRecurring = (e) => {
        setRecurring(e.target.value)
    }
    const handleRecurringPeriod = (e) => {
        setRecurringPeriod(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const collect = async () => {
            if (!title || !subject || !due_date || !priority || (recurring === "Yes" && !recurringPeriod)) {
                alert("Please fill out all required fields.");
                return;
              }
              const session = window.localStorage.getItem("session_user");
              const session_parsed = JSON.parse(session);
              const newTask = {
                title,
                description,
                subject,
                due_date,
                priority,
                recurring,
                recurring_period: recurring === "Yes" ? recurringPeriod : "",
                user_id: session_parsed._id,
                goal: ""
              };
            
              const response = await fetch(`${process.env.REACT_APP_BACKEND}/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 
                        'Authorization': window.localStorage.getItem('token')
                },
                body: JSON.stringify(newTask),
              })
              if (response.status === 401 || response.error === "Invalid token" || response.error === "No token provided") { 
                nav('/')
                return 
              }
              if (response.ok) {
                nav("/Tasks")
              } else {
                console.error("Failed to create task")
              }
        }
        collect();
        
      };

    return (
        <div className="create-task-container">
            <div>
                <h3>Title</h3>
                <input type="text" value={title} onChange={handleTitle} placeholder={"Input Title Here"}/>
            </div>
            <div>
                <h3>Description</h3>
                <input type="text" value={description} onChange={handleDescription} placeholder={"Input Description Here (Optional)"}/>
            </div>
            <div>
                <h3>Subject</h3>
                <input type="text" value={subject} onChange={handleSubject} placeholder={"Input Subject Here"}/>
            </div>
            <div>
                <h3>Due Date</h3>
                <input type="date" onChange={handleDue_date} className='date-input'/>
            </div>
            <div>
                <h3>Priority</h3>
                <select onChange={handlePriority} value={priority}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div>
                <h3>Recurring</h3>
                <select onChange={handleRecurring} value={recurring}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>
            {recurring === "Yes" && (
                <div>
                    <h3>Recurring Period</h3>
                    <select value={recurringPeriod} onChange={handleRecurringPeriod}>
                        <option value="">Select Recurrence</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Biweekly">Biweekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                </div>
            )}
            <div className="create-task-buttons">
                <Link to="/Tasks"> <button className="cancel-btn">Cancel</button></Link>
                <button type="submit" onClick={handleSubmit} className="create-btn">Create Task</button>
            </div>
        </div>
    )


}

export default CreateTask;