import Link from "next/link";
import { SignoutButton } from "@/components/SignoutButton";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { getProfileBySessionUserId } from "@/database/queries";

export const Header = async () => {
  const session = await auth();
  const profile = await getProfileBySessionUserId(session?.user.id);

  return (
    <header className="p-4">
      <div className="flex items-end justify-between">
        <h1 className="text-4xl font-bold">
          <Link href="/">Vinyl Theater</Link>
        </h1>
        {profile && <h6>Welcome, {profile.display}</h6>}
      </div>
      <nav className="mt-4 flex w-full items-center justify-between">
        <ul className="flex gap-2">
          <li>
            <Button asChild size="sm" variant="link">
              <Link href="/">Home</Link>
            </Button>
          </li>
          {session && (
            <>
              <li>
                <Button asChild size="sm" variant="link">
                  <Link href="/profile">Profile</Link>
                </Button>
              </li>
              <li>
                <Button asChild size="sm" variant="link">
                  <Link href="/albums/search">Search Albums</Link>
                </Button>
              </li>
            </>
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
