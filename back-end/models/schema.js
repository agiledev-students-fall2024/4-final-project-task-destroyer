require("../config")
const mongoose = require("mongoose")
const { Schema } = mongoose

mongoose.connect(process.env.DSN) 
const TaskSchema = new mongoose.Schema({
    name: {required: true, type: String},
    due: { type: Date},
    description: {required: false, type: String},
    status: {required: true, type: String},
    priority: {required: true, type: String},
    subject: {required: true, type: String},
    recurring: {required: true, type: String},
    recurring_period: {type: String},
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    goal: {type: Schema.Types.ObjectId, ref: 'Goal'}
  })
// IMPORTANT Comment for Sprint3: Up to end of sprint 3, we're not sure whether we need further maintain 
// the Authentication part. For now we will leave the designed login/register logic at here, but we don't integrate 
// it with other parts. You can Register and login as normal, but it WILL NOT AFFECT ANYTHING!!!
const UserSchema = new mongoose.Schema({
    username: {required: true, type: String},
    password_hash: {required: true, type: String},
    name: {required: true, type: String}
  })

const GoalSchema = new mongoose.Schema({
  title: {type: String,required: true,},
  tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task',},],
  dueDate: {type: Date, required: true,},
  completed_tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task',}],
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User',}
});

const Goal = mongoose.model('Goal', GoalSchema);
const Task = mongoose.model("Task", TaskSchema)
const User = mongoose.model("User", UserSchema)


module.exports = {
  User: mongoose.model("User", UserSchema),
  Task: mongoose.model("Task", TaskSchema),
  Goal: mongoose.model("Goal", GoalSchema),
};

