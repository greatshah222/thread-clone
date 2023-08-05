import { Inter } from "next/font/google";

export const metadata = {
	title: "Threads",
	description: "A Next.js Meta Threads Application",
};

const inter = Inter({
	subsets: ["latin"],
});

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<body className={`${inter.className} bg-dark-1 `}>{children}</body>
		</html>
	);
};

export default AuthLayout;
