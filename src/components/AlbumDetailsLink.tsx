import { Info } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export const AlbumDetailsLink = ({ masterId }: { masterId: number }) => {
  return (
    <Button variant="outline" size="icon" asChild>
      <Link href={`/albums/${masterId}`}>
        <Info />
      </Link>
    </Button>
  );
};
