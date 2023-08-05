"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";

const Bottombar = () => {
	const pathname = usePathname();
	return (
		<section className="bottombar">
			<div className="bottombar_container">
				{sidebarLinks.map((el) => {
					const isActive =
						(pathname?.includes(el?.route) && el?.route.length > 1) || pathname === el?.route;
					return (
						<Link
							href={el?.route}
							key={el?.label}
							className={cn("bottombar_link", isActive && "bg-primary-500")}
						>
							<Image src={el?.imgURL} width={24} height={24} alt={el?.label} />

							<p className="text-subtle-medium text-light-1 max-sm:hidden">
								{/* //TAKING ONLY FIRST WORD IN SMALLER SCREEN */}
								{el?.label?.split(/\s+/)[0]}
							</p>
						</Link>
					);
				})}
			</div>
		</section>
	);
};

export default Bottombar;
