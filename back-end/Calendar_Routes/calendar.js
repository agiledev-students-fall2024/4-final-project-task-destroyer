const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
require('../models/schema'); 
const Task = mongoose.model("Task")
const sanitize = require('mongo-sanitize');


router.get('/calendar/month/:year/:month/tasks/:user_id', async (req, res) => {
  let { year, month, user_id } = req.params;
  year = sanitize(year);
  month = sanitize(month);
  user_id = sanitize(user_id);
  const startOfMonth = new Date(Date.UTC(year, month - 1, 1));
  const endOfMonth = new Date(Date.UTC(year, month, 0, 23, 59, 59));

  try {
    const tasks = await Task.find({
      due: { $gte: startOfMonth, $lte: endOfMonth },
      user_id: user_id
    });

    const daysInMonth = new Date(year, month, 0).getDate();
    const dailyTaskCounts = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      count: 0,
    }));

    tasks.forEach(task => {
      const taskDay = new Date(task.due).getUTCDate(); 
      dailyTaskCounts[taskDay - 1].count += 1;
    });

    res.json(dailyTaskCounts);
  } catch (error) {
    console.error("Error fetching monthly tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get tasks for a specific day, filtered by user_id
router.get('/calendar/:month/:day/:year/:user_id', async (req, res) => {
  let { month, day, year, user_id } = req.params;
  month = sanitize(month);
  day = sanitize(day);
  year = sanitize(year);
  user_id = sanitize(user_id);
  try {
    const startOfDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0)); // Midnight UTC
    const endOfDay = new Date(Date.UTC(year, month - 1, day, 23, 59, 59)); // 23:59:59 UTC
    const tasks = await Task.find({
      due: { $gte: startOfDay, $lte: endOfDay },
      user_id: user_id
    });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks for the day:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;