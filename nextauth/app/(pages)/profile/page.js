import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignOutButton from '../../components/signOutButton';
import { getServerSession } from "next-auth";

export default async function Profile() {
    const session = await getServerSession(authOptions);
    return (
        <div>
            <h1>Hello, {session?.user?.name}</h1>
            <SignOutButton />
        </div>
    )
}