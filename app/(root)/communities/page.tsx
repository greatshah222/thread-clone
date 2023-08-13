import CommunityCard from "@/components/cards/CommunityCard";
import UserCard from "@/components/cards/UserCard";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { profileTabs } from "@/constants";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
	const user = await currentUser();

	if (!user) return null;

	const userInfo = await fetchUser(user.id);

	if (!userInfo?.onboarded) redirect("/onboarding");

	// FETCH communities
	const result = await fetchCommunities({
		searchString: "",
		pageNumber: 1,
		pageSize: 25,
	});

	return (
		<section>
			<h1 className="head-text mb-10">Search</h1>

			{/* // SEARCH BAR */}

			<div className="mt-14 flex flex-col gap-9">
				{result.communities.length === 0 ? (
					<p className="no-result">No results</p>
				) : (
					<>
						{result.communities.map((el) => (
							<CommunityCard
								key={el?.id}
								id={el.id}
								name={el.name}
								username={el?.username}
								imgUrl={el.image}
								bio={el.bio}
								members={el.members}
							/>
						))}
					</>
				)}
			</div>
		</section>
	);
};

export default Page;
