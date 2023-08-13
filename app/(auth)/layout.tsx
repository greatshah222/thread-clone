import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../globals.css";

export const metadata = {
	title: "Threads",
	description: "A Next.js Meta Threads Application",
};

const inter = Inter({
	subsets: ["latin"],
});

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`${inter.className} bg-dark-1`}>
					<div className="flex justify-center items-center min-h-screen w-full ">{children}</div>
				</body>
			</html>
		</ClerkProvider>
	);
};

export default AuthLayout;
