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
} = require("./controllers/tasks_controllers");

app.get("/api/tasks", getTasks);
app.post("/api/tasks", createTask);
app.patch("/api/tasks", updateTaskCompletion);

app.listen(process.env.PORT || 3000, () => {
	console.log("Server running.");
});

app.use(handler_mongoose_errors);
app.all("/api/*", handler_404);

module.exports = app;
