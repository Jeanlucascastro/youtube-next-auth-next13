import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

interface PrivateLayoutProps {
	children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
	const session = await getServerSession(nextAuthOptions)

	if (!session) {
		redirect('/')
	}

	return <>
		<body >
			<div>
				<nav className="navbar .bg-dark .text-light">
					<div className="navbar-especial">
						<Link href={"/"}>Oasis</Link>
					</div>
				</nav>
			</div>
			{children}
		</body>
	</>
}