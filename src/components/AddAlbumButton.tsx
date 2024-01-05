"use client";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { addAlbumToProfile } from "@/lib/actions";
import { toast } from "sonner";

export const AddAlbumButton = ({ masterId }: { masterId: number }) => {
  const handleClick = async () => {
    const res = await addAlbumToProfile(masterId);
    if (!res) return;

    if (res.error) toast.info(res.error);
    else if (res.success) toast.success(res.success);
  };

  return (
    <Button variant="outline" size="icon" type="submit" onClick={handleClick}>
      <Plus />
    </Button>
  );
};
