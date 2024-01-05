"use client";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";

export const GithubSignInButton = ({ message }: { message: string }) => {
  const handleGithubSignin = async () => {
    await signIn("github");
  };

  return (
    <Button
      type="button"
      onClick={handleGithubSignin}
      variant="outline"
      className="w-full"
    >
      <div className="flex items-center">
        <Github className="mr-2 h-4 w-4" />
        {message}
      </div>
    </Button>
  );
};
