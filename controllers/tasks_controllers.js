const {
	fetchTasks,
	postTask,
	amendTaskCompletion,
} = require("../models/tasks_models");

exports.getTasks = async (req, res, next) => {
	fetchTasks()
		.then((tasks) => {
			res.status(200).send({ tasks: tasks });
		})
		.catch((err) => {
			next(err);
		});
};

exports.createTask = async (req, res, next) => {
	const task = req.body.task;
	postTask(task)
		.then((response) => {
			res.status(201).send({ msg: response });
		})
		.catch((err) => {
			next(err);
		});
};

exports.updateTaskCompletion = async (req, res, next) => {
	const task = req.body.task;
	amendTaskCompletion(task)
		.then((response) => {
			res.status(200).send({ updatedTask: response });
		})
		.catch((err) => {
			next(err);
		});
};
