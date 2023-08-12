import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true,
	},

	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},

	community: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Community",
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},

	parentId: {
		type: String,
	},

	// MEANING THREAD CAN HAVE MULTIPLE THREAD AS CHILDREN SO MULTILEVEL
	children: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Thread",
		},
	],
});

// THIS WILL CREATE THE SCHEMA IF IT DOES NOT EXISTS

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
