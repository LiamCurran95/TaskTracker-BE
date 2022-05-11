const seedDB = async () => {
	const path = require("path");
	require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

	const userData = require("./seed_test_data/users");
	const taskData = require("./seed_test_data/tasks");

	const Users = require("../schema/users-schema");
	const Tasks = require("../schema/tasks-schema");

	const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
	const mongoose = require("mongoose");

	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		await mongoose.connection.db.dropCollection("users");
		await mongoose.connection.db.dropCollection("tasks");

		await Users.insertMany(userData);
		await Tasks.insertMany(taskData);
	} catch (error) {
		console.log(error);
	} finally {
		await mongoose.connection.close();
	}
};
// seedDB();
module.exports = seedDB;
