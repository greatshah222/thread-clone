"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";

interface Params {
	userId: string;
	username: string;
	name: string;
	bio: string;
	image: string;
	path: string;
}

export const updateUser = async ({ userId, username, name, bio, image, path }: Params) => {
	try {
		connectToDB();

		await User.findOneAndUpdate(
			{
				id: userId,
			},

			{ username: username.toLowerCase(), name, bio, image, onboarded: true },

			{
				upsert: true, // MEANS BOTH UPDATE AND INSERT
			}
		);

		if (path === "/profile/edit") {
			revalidatePath(path);
		}
	} catch (error: any) {
		throw new Error(`Failed to create/update user: ${error?.message} `);
	}
};

export const fetchUser = async (userId: string) => {
	try {
		connectToDB();

		return await User.findOne({
			id: userId,
		});

		// .populate({

		// 	path:'communities',
		// 	model:Community
		// });
	} catch (error: any) {
		throw new Error(`Failed to fetch user: ${error?.message} `);
	}
};

export const fetchUserPosts = async (userId: string) => {
	connectToDB();

	try {
		// FIND ALL THE THREADS AUTHPRED BY USER WITH THE GIVEN USERID

		// TODO POUPULATE COMMUNITY

		const threads = await User.findOne({
			id: userId,
		}).populate({
			path: "threads",
			model: Thread,
			populate: {
				path: "children",
				model: Thread,
				populate: {
					path: "author",
					model: User,
					select: "name image id",
				},
			},
		});

		return threads;
	} catch (error: any) {
		throw new Error(`Failed to fetch user posts: ${error?.message} `);
	}
};
