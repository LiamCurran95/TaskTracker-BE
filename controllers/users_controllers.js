const { fetchUsers, postUser, checkLogin } = require("../models/users_models");
const bcrypt = require("bcrypt");

exports.getUsers = async (req, res, next) => {
	fetchUsers()
		.then((users) => {
			res.status(200).send({ users: users });
		})
		.catch((err) => {
			next(err);
		});
};

exports.createUser = async (req, res, next) => {
	const user = req.body.newUser;
	if (!user.password || !user.email || !user.username) {
		res.status(500).send({ msg: "Information missing" });
	} else {
		try {
			user.hash_password = await bcrypt.hash(user.password, 10);
			delete user.password;
			postUser(user).then((response) => {
				res.status(201).send({ msg: response });
			});
		} catch {
			(err) => {
				next(err);
			};
		}
	}
};

exports.loginUser = async (req, res, next) => {
	const user = req.body.login;
	if (!user.password || !user.username) {
		res.status(500).send({ msg: "Information missing" });
	} else {
		try {
			checkLogin(user).then((response) => {
				res.status(200).send({ msg: response });
			});
		} catch (err) {
			next(err);
		}
	}
};
