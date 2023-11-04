import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import ButtonLogout from "@/components/ButtonLogout"
import { getServerSession } from "next-auth"
import Link from "next/link"


export default async function Admin(){
	const session = await getServerSession(nextAuthOptions)

	

	return (
		<div className="w-full h-screen flex flex-col items-center justify-center">
			<h1 className="text-2xl mb-8">LOGOU, {session?.user?.name}. PO****</h1>
			<ButtonLogout />
			<Link href={"/videos/2"}>Video 2</Link>
		</div>
	)
}