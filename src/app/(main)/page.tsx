import { MainAlbumCard } from "@/components/MainAlbumCard";
import db from "@/database/db";

const getAlbums = async () => {
  const albums = await db.album.findMany({
    orderBy: { updatedAt: "desc" },
    take: 10,
  });
  return albums;
};

const HomePage = async () => {
  const albums = await getAlbums();

  return (
    <main className="flex-1 p-4">
      <h1 className="text-3xl tracking-tight w-full text-center uppercase bg-primary font-semibold px-2 text-white rounded">
        Recently Added Albums
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
        {albums.length > 0 ? (
          albums
            .slice(0, 5)
            .map((album) => (
              <MainAlbumCard album={album} key={album.masterId} />
            ))
        ) : (
          <div>You Have No Albums</div>
        )}
      </div>
      <h1 className="mt-4 text-3xl tracking-tight w-full text-center uppercase bg-primary font-semibold px-2 text-white rounded">
        Try Something New
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
        {albums.length > 0 ? (
          albums
            .slice(5)
            .map((album) => (
              <MainAlbumCard album={album} key={album.masterId} />
            ))
        ) : (
          <div>You Have No Albums</div>
        )}
      </div>
    </main>
  );
};
export default HomePage;
