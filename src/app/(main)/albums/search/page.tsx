import { DiscogsAlbumCard } from "@/components/DiscogsAlbumCard";
import { DiscogsSearchForm } from "@/components/DiscogsSearchForm";
import { getAlbumsFromDiscogs } from "@/lib/discogs";
import { DiscogsAlbumType } from "@/types/discogs";

const AlbumSearchPage = async ({
  searchParams,
}: {
  searchParams: { artist: string; title: string };
}) => {
  const albums = await getAlbumsFromDiscogs(
    searchParams.artist,
    searchParams.title,
  );

  return (
    <main className="flex-1 p-4 ">
      <DiscogsSearchForm />
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {albums.results.map((album: DiscogsAlbumType) => (
          <DiscogsAlbumCard key={album.master_id} album={album} />
        ))}
      </div>
    </main>
  );
};
export default AlbumSearchPage;
