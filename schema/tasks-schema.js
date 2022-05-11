const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema(
	{
		username: { type: String, required: true, unique: true, trim: true },
		task: { type: String, required: true, trim: true },
		complete: { type: Boolean, default: false },
		created: { type: Date, default: Date.now },
	},
	{ versionKey: false }
);

const Tasks = mongoose.model("Task", taskSchema);

module.exports = Tasks;
