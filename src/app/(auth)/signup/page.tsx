import { Branding } from "@/components/auth/Branding";
import { GithubSignInButton } from "@/components/auth/GithubSignInButton";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { ReturnHomeButton } from "@/components/auth/ReturnHomeButton";
import { SignupForm } from "@/components/auth/SignupForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SignupPage = () => {
  return (
    <div>
      <Branding />
      <div className="border px-6 py-4 rounded shadow space-y-2 w-[24rem] mt-2">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Sign up</h1>
          <ReturnHomeButton />
        </div>
        <SignupForm />
        <GoogleSignInButton message="Sign up with Google" />
        <GithubSignInButton message="Sign up with Github" />
        <p className="text-sm text-muted-foreground text-center">
          Already have an account?{" "}
          <Button className="px-0" variant="link" asChild>
            <Link href="/signin">Sign in here</Link>
          </Button>
        </p>
      </div>
    </div>
  );
};
export default SignupPage;
