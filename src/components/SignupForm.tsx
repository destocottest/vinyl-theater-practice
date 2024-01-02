"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { signupAction } from "@/lib/actions";
import { signupSchema, signupSchemaType } from "@/schemas";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const SignupForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<signupSchemaType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirm: "",
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const submit = async (values: signupSchemaType) => {
    setErrorMessage(null);
    const res = await signupAction(values);
    if (res.error) setErrorMessage(res.error);
    if (res.success) {
      toast.success(`Welcome ${values.username}! Please Sign-in`, {
        duration: 2000,
      });
      router.push(`/signin?success=${values.username}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(submit)} className="space-y-4 w-[20rem]">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="Enter your email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="Create a username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  type="password"
                  placeholder="Confirm your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {errorMessage && (
          <p className="text-sm bg-red-100 text-destructive px-3 py-2 rounded">
            {errorMessage}
          </p>
        )}
        <Button disabled={isSubmitting} type="submit" className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 animate-spin" />
              Signing up...
            </>
          ) : (
            "Sign up"
          )}
        </Button>
      </form>
    </Form>
  );
};
