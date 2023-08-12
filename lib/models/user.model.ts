import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
	id: {
		type: String,
		required: true,
	},

	username: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	image: String,
	bio: String,
	threads: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Thread",
		},
	],

	onboarded: {
		type: Boolean,
		default: false,
	},

	communities: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Community",
		},
	],
});

// THIS WILL CREATE THE SCHEMA IF IT DOES NOT EXISTS

const User = mongoose.models.User || mongoose.model("User", userScheme);

export default User;
