import { ReturnHomeButton } from "@/components/ReturnHomeButton";
import { SigninForm } from "@/components/SigninForm";
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
    <div className="border  px-6 py-4 rounded shadow space-y-2">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Sign in</h1>
        <ReturnHomeButton />
      </div>
      <SigninForm />
      <p className="text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Button className="px-0" variant="link" asChild>
          <Link href="/signup">Sign up here</Link>
        </Button>
      </p>
    </div>
  );
};
export default SigninPage;
