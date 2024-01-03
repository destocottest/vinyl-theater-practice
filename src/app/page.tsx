import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";
import Link from "next/link";

const HomePage = async () => {
  const session = await auth();

  return (
    <div className="">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button variant="secondary" type="submit">
          Sign Out
        </Button>
      </form>
      <Button asChild>
        <Link href="/signin">Sign In</Link>
      </Button>
    </div>
  );
};
export default HomePage;
