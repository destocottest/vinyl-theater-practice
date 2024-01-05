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
} from "../ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signupAction } from "@/lib/actions";
import { signupSchema, signupSchemaType } from "@/schemas";
import { useEffect, useState } from "react";
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
      display: "",
      password: "",
      confirm: "",
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
    setValue,
  } = form;

  const submit = async (values: signupSchemaType) => {
    setErrorMessage(null);
    const res = await signupAction(values);
    if (res.error) setErrorMessage(res.error);
    if (res.success) {
      toast.success(`Welcome ${values.display}! Please Sign-in`, {
        duration: 2000,
      });
      router.push("/signin");
    }
  };

  const watchDisplayName = watch("display");
  useEffect(() => {
    setValue("display", watchDisplayName.toLowerCase());
  }, [watchDisplayName, setValue]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
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
          name="display"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="Create a display name"
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
