const BASE_URL = "https://api.discogs.com";

export const getAlbumsFromDiscogs = async (
  artist: string = "",
  title: string = ""
) => {
  const type = "master";
  const format = "album";
  const page = "1";
  const per_page = "10";

  const res = await fetch(
    `${BASE_URL}/database/search?type=${type}&format=${format}&artist=${artist}&title=${title}&page=${page}&per_page=${per_page}`,
    {
      headers: {
        Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`,
      },
    }
  );

  const json = await res.json();
  return json;
};

export const getAlbumFromDiscogsMasterId = async (masterId: number) => {
  const res = await fetch(
    `${BASE_URL}/masters/${masterId}?page=1&per_page=1?&fields=uri`,
    {
      headers: {
        Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`,
      },
    }
  );

  const json = await res.json();
  delete json.tracklist;
  delete json.videos;

  return {
    title: json.title,
    artist: json.artists[0].name,
    cover: json.images[0].uri,
    year: json.year,
  };
};
