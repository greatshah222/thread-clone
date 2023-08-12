import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.action";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
	const user = await currentUser();
	const results = await fetchPosts(1, 30);
	return (
		<div>
			<h1 className="head-text text-left ">Home</h1>

			<section className="mt-9 flex flex-col gap-10">
				{results.posts.length === 0 ? (
					<p className="no-result">No threads found</p>
				) : (
					<>
						{results.posts.map((el) => (
							<ThreadCard
								key={el?._id}
								id={el?._id}
								currentUserId={user?.id}
								parentId={el?.parentId} // SHOULD NE NULL IN THIS CASE
								content={el?.text}
								author={el?.author}
								community={el?.community}
								createdAt={el?.createdAt}
								comments={el?.children}
							/>
						))}
					</>
				)}
			</section>
		</div>
	);
}
