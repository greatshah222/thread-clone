import UserCard from "@/components/cards/UserCard";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { communityTabs } from "@/constants";
import { fetchCommunityDetails } from "@/lib/actions/community.actions";

import { currentUser } from "@clerk/nextjs";
import Image from "next/image";

const Page = async ({ params }: { params: { id: string } }) => {
	const user = await currentUser();

	if (!user) return null;
	const communityDetails = await fetchCommunityDetails(params.id);

	return (
		<section>
			<ProfileHeader
				accountId={communityDetails.id}
				authUserId={user.id}
				name={communityDetails.name}
				username={communityDetails.username}
				imgUrl={communityDetails.image}
				bio={communityDetails.bio}
				type="Community"
			/>

			<div className="mt-9">
				<Tabs defaultValue="threads" className="w-full">
					<TabsList className="tab">
						{communityTabs?.map((el) => (
							<TabsTrigger value={el?.value} key={el?.value} className="tab">
								<Image
									src={el?.icon}
									alt={el?.label}
									width={24}
									height={24}
									className="object-contain"
								/>

								<p className="max-sm:hidden">{el.label}</p>

								{el?.label === "Threads" && (
									<p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
										{communityDetails?.threads?.length}
									</p>
								)}
							</TabsTrigger>
						))}
					</TabsList>

					<TabsContent value={"threads"} className="w-full text-light-1">
						<ThreadsTab
							currentUserId={user.id}
							accountId={communityDetails._id}
							accountType="Community"
						/>
					</TabsContent>
					<TabsContent value={"members"} className="w-full text-light-1">
						<section className="mt-9 flex flex-col gap-10">
							{communityDetails?.members?.map((el: any) => (
								<UserCard
									key={el.id}
									id={el.id}
									name={el.name}
									username={el?.username}
									imgUrl={el.image}
									personType="User"
								/>
							))}
						</section>
					</TabsContent>
					<TabsContent value={"requests"} className="w-full text-light-1">
						<ThreadsTab
							currentUserId={user.id}
							accountId={communityDetails.id}
							accountType="Community"
						/>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
};

export default Page;
