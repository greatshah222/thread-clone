"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";

import { sidebarLinks } from "@/constants/index";
import { cn } from "@/lib/utils";

const LeftSidebar = () => {
	const pathname = usePathname();
	const router = useRouter();
	return (
		<section className="custom-scrollbar leftsidebar">
			<div className="flex w-full flex-1 flex-col gap-6 px-4">
				{sidebarLinks.map((el) => {
					const isActive =
						(pathname?.includes(el?.route) && el?.route.length > 1) || pathname === el?.route;
					return (
						<Link
							href={el?.route}
							key={el?.label}
							className={cn("leftsidebar_link", isActive && "bg-primary-500")}
						>
							<Image src={el?.imgURL} width={24} height={24} alt={el?.label} />

							<p className="text-light-1 max-lg:hidden"> {el?.label}</p>
						</Link>
					);
				})}
			</div>

			<div className="mt-10 px-6">
				<SignedIn>
					<SignOutButton signOutCallback={() => router.push("/sign-in")}>
						<div className="flex cursor-pointer gap-4 p-4">
							<Image src={"/assets/logout.svg"} width={24} height={24} alt="logout" />

							<p className="text-light-2 max-lg:hidden">Logout</p>
						</div>
					</SignOutButton>
				</SignedIn>
			</div>
		</section>
	);
};

export default LeftSidebar;
