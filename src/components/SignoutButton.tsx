import { signOut } from "@/lib/auth";
import { Button } from "./ui/button";

export const SignoutButton = () => {
  const handleSignout = async () => {
    "use server";
    await signOut({ redirectTo: "/" });
  };

  return (
    <form action={handleSignout}>
      <Button variant="outline" size="sm" type="submit">
        Sign Out
      </Button>
    </form>
  );
};
