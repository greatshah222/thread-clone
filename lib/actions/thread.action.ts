"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
	text: string;
	author: string;
	communityId: string | null;

	path: string;
}
export async function createThread({ text, author, communityId, path }: Params) {
	connectToDB();
	try {
		const createdThread = await Thread.create({
			text,
			author,
			community: null,
		});

		// UPDATE USER MODEL push to user who created it

		await User.findByIdAndUpdate(author, {
			$push: {
				threads: createdThread._id,
			},
		});
		revalidatePath(path);
	} catch (error: any) {
		throw new Error("Error creating thread", error);
	}
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
	connectToDB();
	try {
		// caluclaute the number of posts to skip

		const skipAmount = (pageNumber - 1) * pageSize;

		// FETCH THE POSTS THAT HAVE NO PARENTS (TOP-LEVEL TREADS). cause if the threads have any parent they are actually comments
		const postQuery = Thread.find({
			parentId: {
				$in: [null, undefined],
			},
		})
			.sort({ createdAt: "desc" })
			.skip(skipAmount)
			.limit(pageSize)
			.populate({
				path: "author",
				model: User,
			})
			.populate({
				path: "children",
				populate: {
					path: "author",
					model: User,
					select: "_id name parentId image",
				},
			});

		const totalPostsCount = await Thread.countDocuments({
			parentId: {
				$in: [null, undefined],
			},
		});
		const posts = await postQuery.exec();
		const isNext = totalPostsCount > skipAmount + posts.length;

		return { posts, isNext };
	} catch (error: any) {
		throw new Error("Error creating thread", error);
	}
}

export const fetchThreadById = async (id: string) => {
	connectToDB();

	// TODO POPULATE COMMUNITY
	try {
		const thread = await Thread.findById(id)
			.populate({
				path: "author",
				model: User,
				select: "_id id name image",
			})
			.populate({
				path: "children",
				populate: [
					{
						path: "author",
						model: User,
						select: "_id id name parentId image",
					},

					{
						path: "children",
						model: Thread,
						populate: {
							path: "author",
							model: User,
							select: "_id id name parentId image",
						},
					},
				],
			})
			.exec();

		return thread;
	} catch (error: any) {
		throw new Error("Error fetching thread by id", error.message);
	}
};

export const addCommentToThread = async (
	threadId: string,
	commentText: string,
	userId: string,
	path: string
) => {
	connectToDB();
	try {
		// FIND THE ORIGINAL THREAD BY ID
		const originalThread = await Thread.findById(threadId);

		if (!originalThread) {
			throw new Error("Thread not found");
		}

		// CREATE A NEW THREAD WITH THE COMMENT TEXT

		const commentThread = new Thread({
			text: commentText,
			author: userId,
			parentId: threadId,
		});

		// SAVE THE THREAD
		const savedCommentThread = await commentThread.save();

		// UPDATE THE ORIGINAL THREAD TO INCLUDE THE NEW COMMENT
		originalThread.children.push(savedCommentThread._id);

		// save the original thread

		await originalThread.save();
		revalidatePath(path);
	} catch (error: any) {
		throw new Error("Error adding comment to thread", error);
	}
};
