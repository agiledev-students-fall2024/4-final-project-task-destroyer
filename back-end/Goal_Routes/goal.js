const { Router } = require('express');
const mongoose = require('mongoose');
const Goal = mongoose.model("Goal");
const Task = mongoose.model('Task');
const sanitize = require('mongo-sanitize');


const app = new Router();

app.get('/goals/:id', async (req, res) => {
    let userId = req.params.id;
    userId = sanitize(userId);
    try {
      const goals = await Goal.find({"user_id": userId}).populate('tasks');
      const enrichedGoals = goals.map(goal => {
        const completedTasks = goal.tasks.filter(task => task.status === 'finished');
        return {
            ...goal.toObject(),
            completed_tasks: completedTasks,
        };
    });
      res.json(enrichedGoals);
    } catch (error) {
      res.status(500).json([]);
    }
  });

app.delete('/delete/goals/:id', async (req, res) => {
    let goalId = req.params.id;
    goalID = sanitize(goalId)
    try {
        const goal = await Goal.findByIdAndDelete(goalId);
        if (!goal) {
            return res.status(404).json({ error: 'Goal not found' });
        }
        res.json(goal);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete goal.' });
    }
})
  

app.post('/goals/new', async (req, res) => {
    try {
        let { title, tasks, dueDate, user_id } = req.body;
        title = sanitize(title)
        tasks = sanitize(tasks)
        dueDate = sanitize(dueDate)
        user_id = sanitize(user_id)

        const existingTasks = await Task.find({ _id: { $in: tasks } });
        if (existingTasks.length !== tasks.length) {
            return res.status(400).json({ error: 'Some tasks do not exist.' });
        }

        const goal = new Goal({
            title,
            tasks,
            dueDate,
            completed_tasks: [],
            user_id
        });

        const savedGoal = await goal.save();
        res.status(201).json(savedGoal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create goal.' });
    }
});



module.exports = app;