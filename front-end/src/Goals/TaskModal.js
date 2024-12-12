import React from 'react';
import './TaskModal.css';

const TaskModal = ({ goal, onClose }) => {
    return (
        <div className="modal-background">
            <div className="modal-content">
                <h2>{goal.title}</h2>
                <h3>Tasks:</h3>
                <ul>
                    {goal.tasks.map((task, index) => (
                        <li className="modal" key={index}>
                            <p>Task:{task.name},  Due Date:{new Date(task.due).toLocaleDateString()}</p> {/* Format due date */}
                        </li>
                    ))}
                </ul>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default TaskModal;
