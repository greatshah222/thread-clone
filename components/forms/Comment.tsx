"use client";

import * as z from "zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CommentValidation } from "@/lib/validations/thread";
import { addCommentToThread, createThread } from "@/lib/actions/thread.action";
import Image from "next/image";

interface CommentProps {
	threadId: string;
	currentuserImg: string;
	currentuserId: string;
}

const Comment = ({ threadId, currentuserImg, currentuserId }: CommentProps) => {
	const pathname = usePathname();
	const router = useRouter();

	const form = useForm({
		resolver: zodResolver(CommentValidation),
		defaultValues: {
			thread: "",
		},
	});

	async function onSubmit(values: z.infer<typeof CommentValidation>) {
		await addCommentToThread(threadId, values.thread, JSON.parse(currentuserId), pathname);

		form.reset();
		router.push("/");
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
				<FormField
					control={form.control}
					name="thread"
					render={({ field }) => (
						<FormItem className="flex  gap-3 w-full items-center">
							<FormLabel>
								<Image
									src={currentuserImg}
									alt="Profile Image"
									height={48}
									width={48}
									className="rounded-full object-cover"
								/>
							</FormLabel>
							<FormControl className="border-none bg-transparent">
								<Input
									type="text"
									{...field}
									placeholder="Comment..."
									className="no-focus text-light-1 outline-none"
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<Button type="submit" className="comment-form_btn">
					Reply
				</Button>
			</form>
		</Form>
	);
};

export default Comment;
