"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

const DiscogsSearchSchema = z.object({
  artist: z.string().min(3).optional().or(z.literal("")),
  title: z.string().min(3).optional().or(z.literal("")),
});

export const DiscogsSearchForm = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm<z.infer<typeof DiscogsSearchSchema>>({
    resolver: zodResolver(DiscogsSearchSchema),
    defaultValues: {
      artist: searchParams.get("artist") ?? "",
      title: searchParams.get("title") ?? "",
    },
  });

  const submit = (values: z.infer<typeof DiscogsSearchSchema>) => {
    const params = new URLSearchParams(searchParams);
    values.artist
      ? params.set("artist", values.artist)
      : params.delete("artist");
    values.title ? params.set("title", values.title) : params.delete("title");
    router.replace(`${pathname}?${params}`);
  };

  return (
    <div className="rounded-md border p-2 shadow">
      <h1 className="w-full rounded bg-primary px-2 text-center text-2xl font-semibold uppercase tracking-tight text-white">
        Search for an album
      </h1>
      <Form {...form}>
        <form
          className="mt-2 flex flex-col gap-4 md:flex-row"
          onSubmit={form.handleSubmit(submit)}
        >
          <FormField
            name="artist"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Artist</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="md:self-end">
            <Search />
          </Button>
        </form>
      </Form>
    </div>
  );
};
