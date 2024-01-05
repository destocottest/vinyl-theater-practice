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
import { signinSchema, signinSchemaType } from "@/schemas";
import { signinAction } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export const SigninForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const form = useForm<signinSchemaType>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const submit = async (values: signinSchemaType) => {
    setErrorMessage(null);
    const res = await signinAction(values);
    if (res?.error) setErrorMessage(res.error);
  };

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
        {errorMessage && (
          <p className="text-sm bg-red-100 text-destructive px-3 py-2 rounded">
            {errorMessage}
          </p>
        )}
        <Button disabled={isSubmitting} type="submit" className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </Form>
  );
};
