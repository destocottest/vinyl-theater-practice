import { auth } from "@/lib/auth";
import { getProfileByUserId } from "@/lib/queries";

const ProfilePage = async () => {
  const session = await auth();
  const profile = session && (await getProfileByUserId(session.user.id));

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
