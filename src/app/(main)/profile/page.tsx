import { auth } from "@/lib/auth";
import { MainAlbumCard } from "@/components/MainAlbumCard";
import db from "@/database/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const getProfileWithAlbums = async (sessionUserId: string | undefined) => {
  if (!sessionUserId) return undefined;

  try {
    const profile = await db.profile.findUnique({
      where: { id: sessionUserId },
      include: {
        collection: true,
      },
    });
    return profile;
  } catch (error) {
    throw new Error("Profile does not exist for this user");
  }
};

const ProfilePage = async () => {
  const session = await auth();
  const profile = await getProfileWithAlbums(session?.user.id);

  if (!profile) return <p>Profile Not Found!</p>;

  return (
    <main className="flex-1 p-4">
      <div className="max-w-xs rounded bg-secondary p-4 shadow">
        <h2>id: {profile?.id}</h2>
        <h2>display: {profile?.display}</h2>
        <h2 className="truncate">image: {profile?.image ?? "no image"}</h2>
      </div>
      <h1 className="mt-4 w-full rounded bg-primary px-2 text-center text-3xl font-semibold uppercase tracking-tight text-white">
        Your Album Collection
      </h1>
      {profile.collection.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {profile.collection.map((album) => (
            <MainAlbumCard album={album} key={album.masterId} profile={true} />
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-xl">
          You have no albums in your collection! Search{" "}
          <Button asChild variant="link" className="px-0 text-xl">
            <Link href="/albums/search">here</Link>
          </Button>
        </div>
      )}
    </main>
  );
};
export default ProfilePage;
