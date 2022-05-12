require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ERRORS
const {
	handler_404,
	handler_mongoose_errors,
} = require("./controllers/errors_controllers");

//USERS
const {
	getUsers,
	createUser,
	loginUser,
} = require("./controllers/users_controllers");

app.get("/api/users", getUsers);
app.post("/api/users", createUser);
app.post("/api/users/login", loginUser);

//TASKS
const {
	getTasks,
	createTask,
	updateTaskCompletion,
	getTasksByUser,
} = require("./controllers/tasks_controllers");

app.get("/api/tasks", getTasks);
app.get("/api/tasks/:username", getTasksByUser);
app.post("/api/tasks", createTask);
app.patch("/api/tasks", updateTaskCompletion);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server running on ${port}`);
});

app.use(handler_mongoose_errors);
app.all("/api/*", handler_404);

module.exports = app;
