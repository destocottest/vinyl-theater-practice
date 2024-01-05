import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Info } from "lucide-react";
import { AddAlbumButton } from "./AddAlbumButton";
import { Album } from "@prisma/client";

export const MainAlbumCard = ({
  album,
  profile = false,
}: {
  album: Album;
  profile?: boolean;
}) => {
  return (
    <div className="relative">
      <Card className="group">
        <CardHeader className="min-h-32">
          <CardTitle className="line-clamp-2">{album.title}</CardTitle>
          <CardDescription>{album.artist}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-square">
            <Image
              src={album.cover || ""}
              alt=""
              fill
              className="cover shadow"
            />
          </div>
        </CardContent>
        <Card className="absolute left-0 top-0 z-10 grid h-full w-full place-items-center bg-secondary/50 opacity-0 group-hover:opacity-100">
          <CardContent className="flex gap-4">
            {!profile && <AddAlbumButton masterId={album.masterId} />}
            <Button variant="outline" size="icon">
              <Info />
            </Button>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
};
