const mongoose = require("mongoose");
const Tasks = require("../schema/tasks-schema");

const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

exports.fetchTasks = async () => {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		const tasks = await Tasks.find({});
		return tasks;
	} catch (err) {
		console.log(err);
	} finally {
		mongoose.connection.close;
	}
};

exports.fetchTasksByUser = async (username) => {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		const tasks = await Tasks.find({ username: username });
		return tasks;
	} catch (err) {
		console.log(err);
	} finally {
		mongoose.connection.close;
	}
};

exports.postTask = async (task) => {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		await Tasks.create(task);
		return "Task successfully posted.";
	} catch (err) {
		console.log(err);
	} finally {
		mongoose.connection.close;
	}
};

exports.amendTaskCompletion = async ({ username, task, complete }) => {
	const filter = { username, task };
	const update = complete;
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		const data = await Tasks.findOneAndUpdate(
			filter,
			{ complete: update },
			{
				returnOriginal: false,
			}
		);
		return data;
	} catch (err) {
		console.log(err);
	} finally {
		await mongoose.connection.close();
	}
};
