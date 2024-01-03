import Link from "next/link";
import { SignoutButton } from "./SignoutButton";
import { Button } from "./ui/button";
import { auth } from "@/lib/auth";
import { getProfileByUserId } from "@/lib/queries";

export const Header = async () => {
  const session = await auth();
  const profile = session && (await getProfileByUserId(session.user.id));

  return (
    <header className="px-2 py-4">
      <div className="flex justify-between items-end">
        <h1 className="text-4xl font-bold">
          <Link href="/">Vinyl Theater</Link>
        </h1>
        <h6>welcome, {profile?.display}</h6>
      </div>
      <nav className="w-full flex justify-between items-center mt-4">
        <ul className="flex gap-4">
          <li>
            <Button asChild size="sm">
              <Link href="/">Home</Link>
            </Button>
          </li>
          {session && (
            <li>
              <Button asChild size="sm">
                <Link href="/profile">Profile</Link>
              </Button>
            </li>
          )}
        </ul>
        {session ? (
          <SignoutButton />
        ) : (
          <Button asChild size="sm" variant="outline">
            <Link href="/signin">Sign In</Link>
          </Button>
        )}
      </nav>
    </header>
  );
};
