import React, { useEffect, useState } from 'react';
import './Calendar_monthly.css';
//import './index.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Calendar_monthly = () => {
    const navigate = useNavigate();
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentDate = new Date(); 
    const month = currentDate.getMonth() + 1;
    const monthStr = monthNames[month - 1];
    const year = currentDate.getFullYear();

    // get the first date of the current month
    const firstDay = new Date(year, month-1, 1).getDay();
    // get the total days in the month
    const daysInMonth = new Date(year, month, 0).getDate();

    // get the last day of the month (0-6, where 0 is Sunday)
    const lastDay = new Date(year, month-1, daysInMonth).getDay();
    
    // generate an array of all the days in the month
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // padding days for the first week (if the month doesn't start on Sunday)
    const startPadding = Array(firstDay).fill(null)
    
     // padding days for the last week (if the month doesn't end on Saturday)
    const endPadding = Array(lastDay === 6 ? 0 : 6 - lastDay).fill(null)
 
     // combine all arrays: start padding + days + end padding
    const paddedDaysArray = [...startPadding, ...daysArray, ...endPadding]

    // group days into weeks
    const weeks = [];
    for (let i = 0; i < paddedDaysArray.length; i += 7) {
        weeks.push(paddedDaysArray.slice(i, i + 7));
    }

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const [taskCounts, setTaskCounts] = useState({});

    // Fetch task counts for each day in the current month
    useEffect(() => {
        const fetchTaskCounts = async () => {
            try {
                const session = window.localStorage.getItem("session_user");
                if (!session) {
                    console.error("No session found. Please log in.");
                    return;
                }
                const sessionParsed = JSON.parse(session);
                const response = await fetch(`${process.env.REACT_APP_BACKEND}/calendar/month/${year}/${month}/tasks/${sessionParsed?._id}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': window.localStorage.getItem('token')
                        }
            });
                if (response.status === 401 || response.error === "Invalid token" || response.error === "No token provided") {
                    navigate('/');
                    return;
                }
                const taskData = await response.json();
                const taskCounts = taskData.reduce((acc, { day, count }) => {
                    acc[day] = count;
                    return acc;
                  }, {});
                setTaskCounts(taskCounts);
            } catch (error) {
                console.error("Error fetching task counts", error);
            }
        };
        fetchTaskCounts();
    }, [year, month]);


    return (
        <main>
            <div className="calendar-container">
                <div className='title'>
                    <h2>{monthStr}, {year}</h2>
                </div>

                <div className="month">
                    
                    <div className='header'>
                        {dayNames.map((dayName, index) => (
                            <div className="dayName" key={index}>{dayName}</div>
                        ))}
                    </div>

                    {weeks.map((week, weekIndex) => (
                        <div className="week" key={weekIndex}>
                            {week.map((day, dayIndex) => (
                                <div className="day" key={dayIndex}>
                                    {/* Day number with Link */}
                                    {day ? (
                                        <Link to={`/${month}/${day}/${year}`} className="day-link">
                                            {day}
                                        </Link>
                                    ) : ' '}
                                    
                                    {/* Conditionally render Tasks */}
                                    <div className='task_calendar'>
                                        {day !== null ? <p>Tasks:</p> : null} 
                                        {day !== null ?  <p>{taskCounts[day] || 0}</p>: null }
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>     
        </main>
    );
}

export default Calendar_monthly;
