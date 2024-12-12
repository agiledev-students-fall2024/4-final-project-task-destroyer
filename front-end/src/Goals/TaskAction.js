import React from 'react';
import './TaskModal.css';

const TaskModal = ({ goal, onClose, action, trigger, setTrigger }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/delete/goals/${goal?._id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json',
                            'Authorization': window.localStorage.getItem('token')
                 },
            });

            if (!response.ok) {
                console.error("Failed to delete the goal");
                return;
            } 
            setTrigger(!trigger);
            onClose();
        } catch (error) {
            console.error("Error deleting the goal:", error);
        }
    };

    return (
        <div className="modal-background">
            <div className="modal-content">
                <h2>Are you sure you want to {action} {goal.title}?</h2>
                <button onClick={handleDelete}>Confirm</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default TaskModal;
