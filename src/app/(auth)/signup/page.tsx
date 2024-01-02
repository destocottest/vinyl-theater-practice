import { ReturnHomeButton } from "@/components/ReturnHomeButton";
import { SignupForm } from "@/components/SignupForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SignupPage = () => {
  return (
    <div className="border px-6 py-4 rounded shadow space-y-2">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Sign up</h1>
        <ReturnHomeButton />
      </div>
      <SignupForm />
      <p className="text-sm text-muted-foreground">
        Already have an account?{" "}
        <Button className="px-0" variant="link" asChild>
          <Link href="/signin">Sign in here</Link>
        </Button>
      </p>
    </div>
  );
};
export default SignupPage;
