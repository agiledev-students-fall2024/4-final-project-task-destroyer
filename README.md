# Task Destroyer

## Project Description

Task Destroyer is a mobile application to help both high school and university students with poor task management to organize their academic tasks such as homework, exams, and quizzes. By providing intuitive task input along with due dates, prioritization, progress tracking and a straightforward calendar view about their tasks, Task Destroyer can help the students who are not comfortable to the new academic stage orderly manage their tasks and handle all of those with planning.

## Product Vision Statement

The vision of Task Destroyer focus on the group of high school or unversity students. These students have relative heavy academic workload, while many of them are not comfortable and don't know how to deal with the workload. Thus, our Task Destroyer aims to simplify the organization of academic tasks, helping students manage their workload without feeling overwhelmed. For an early release version, we will focus core features such as task lists, goal setting, and calendar overview. Our long-term goal is to help students stay organized, reduce stress, and ultimately improve their academic performance.

## Team Members

- Xiaowei Ma [GitHub](https://github.com/WillliamMa)
- Rishi Rana [GitHub](https://github.com/Rishi-Rana1)
- Arnav Nayak [GitHub](https://github.com/ern-02)
- Nathan Daniel [GitHub](https://github.com/WayyGood)
- Rena Wang [GitHub](https://github.com/nomegustaexam)

## Project History

The idea for the project of our team came from observing the academic environment around us. Many students are dealing with multiple kinds of tasks from different courses, researches or projects. However, lots of students are struggling to stay organized for all the tasks they have. As a result, some students have the problem such as missed due date or bad time arrangement for an important exam. Thus, we want to develop an application that can help students to solve this problem in an straghtforward way!

## How to contribute

We sincerely appreciate your contribution! To start contribute, please visit the following link for [CONTRIBUTING.md](./CONTRIBUTING.md) and follow the guidelines!

## Building & Testing

To set up the project locally, follow these steps:

1. Clone the Repo to local and open:

   ```bash
   git clone https://github.com/agiledev-students-fall2024/4-final-project-task-destroyer.git
   ```

2. Navigate to the project directory

3. Navigate to the according directories and install dependencies:

   ```bash
   npm install jsonwebtoken
   npm install mongo-sanitize
   npm install mongoose
   npm install chai
   npm install mocha
   npm install axios
   
   cd back-end
   npm install
   cd front-end
   npm install
   ```

4. Create a file named ".env" in the back-end folder and add the following content to the file:

```
PORT=4000
DSN = "mongodb+srv://williamma:mxw20040509@williamma.g5yza.mongodb.net/?retryWrites=true&w=majority&appName=WilliamMa"
FRONTEND="http://localhost:3000/"
SECRET = "dev ops project"
```

4. Create a file named ".env" in the front-end folder and add the following content to the file:

```
REACT_APP_BACKEND="http://localhost:4000/"
```

### Run the Application

1. Navigate to the back-end folder and start the backend server:

   ```bash
   cd back-end
   npm start
   ```
   The back-end server should be running on http://localhost:4000

2.  Navigate to the front-end folder and start the frontend application:
   
   ```bash
   cd front-end
   npm start
   ```
   The front-end should be accessible on http://localhost:3000

### Testing

1. Enter in backend directory.
   ```bash
   cd back-end
   ```
2. Run the test script:
   ```bash
   npm run test
   ```
