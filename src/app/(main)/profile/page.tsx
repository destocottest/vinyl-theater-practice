import { auth } from "@/lib/auth";
import { getProfileBySessionUserId } from "@/database/queries/user";

const ProfilePage = async () => {
  const session = await auth();
  const profile = session && (await getProfileBySessionUserId(session.user.id));

  return (
    <main className="flex-1 grid place-items-center">
      <div className="bg-secondary text-secondary-foreground rounded shadow p-4 max-w-xs">
        <h2>id: {profile?.id}</h2>
        <h2>display: {profile?.display}</h2>
        <h2 className="truncate">
          image: {profile?.image ?? "no image found"}
        </h2>
      </div>
    </main>
  );
};
export default ProfilePage;
