import { Branding } from "@/components/auth/Branding";
import { GithubSignInButton } from "@/components/auth/GithubSignInButton";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { ReturnHomeButton } from "@/components/auth/ReturnHomeButton";
import { SigninForm } from "@/components/auth/SigninForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SigninPage = ({
  searchParams,
}: {
  searchParams: { success: string };
}) => {
  if (searchParams.success) {
  }

  return (
    <div>
      <Branding />
      <div
        className="border  px-6 py-4 rounded shadow space-y-2 w-[24rem] mt-2
      "
      >
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Sign in</h2>
          <ReturnHomeButton />
        </div>
        <SigninForm />
        <GoogleSignInButton message="Sign in with Google" />
        <GithubSignInButton message="Sign in with Github" />
        <p className="text-sm text-muted-foreground text-center">
          Don&apos;t have an account?{" "}
          <Button className="px-0" variant="link" asChild>
            <Link href="/signup">Sign up here</Link>
          </Button>
        </p>
      </div>
    </div>
  );
};
export default SigninPage;
