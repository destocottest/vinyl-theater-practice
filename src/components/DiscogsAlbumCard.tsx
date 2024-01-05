import { DiscogsAlbumType } from "@/types/discogs";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddAlbumButton } from "./AddAlbumButton";
import { AlbumDetailsLink } from "./AlbumDetailsLink";

export const DiscogsAlbumCard = ({ album }: { album: DiscogsAlbumType }) => {
  return (
    <div className="relative">
      <Card className="group">
        <CardHeader className="min-h-32">
          <CardTitle className="line-clamp-2">{album.title}</CardTitle>
          <CardDescription>{album.year}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-square">
            <Image
              src={album.cover_image}
              alt=""
              fill
              className="cover shadow"
              loading="lazy"
            />
          </div>
        </CardContent>
        <Card className="absolute left-0 top-0 z-10 grid h-full w-full place-items-center bg-secondary/60 opacity-0 group-hover:opacity-100">
          <CardContent>
            <p className="px-2 text-center text-sm font-semibold tracking-tighter drop-shadow-sm">
              {album.title}
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <AddAlbumButton masterId={album.master_id} />
              <AlbumDetailsLink masterId={album.master_id} />
            </div>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
};
