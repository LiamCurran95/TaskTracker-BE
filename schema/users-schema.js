const mongoose = require("mongoose");
const { Schema } = mongoose;
// const bcrypt = require("bcrypt");

const userSchema = new Schema(
	{
		username: { type: String, required: true, unique: true, trim: true },
		email: { type: String, required: true, unique: true, trim: true },
		hash_password: { type: String, required: true, unique: true, trim: true },
	},
	{ versionKey: false }
);

const Users = mongoose.model("User", userSchema);

module.exports = Users;
