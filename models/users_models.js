const mongoose = require("mongoose");
const Users = require("../schema/users-schema");
const bcrypt = require("bcrypt");

const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

exports.fetchUsers = async () => {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		const users = await Users.find({});
		return users;
	} catch (err) {
		console.log(err);
	} finally {
		mongoose.connection.close;
	}
};

exports.postUser = async (user) => {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		await Users.create(user);
		return "User successfully created.";
	} catch (err) {
		console.log(err);
	} finally {
		await mongoose.connection.close;
	}
};

exports.checkLogin = async (user) => {
	const { username, password } = user;
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		const response = await Users.findOne({ username });
		if (response == null) {
			return "Cannot find user";
		}
		if (await bcrypt.compare(password, response.hash_password)) {
			return "Successfully logged in.";
		} else {
			return "Incorrect password.";
		}
	} catch (err) {
		console.log(err);
	} finally {
		await mongoose.connection.close();
	}
};
