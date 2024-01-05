export type DiscogsAlbumType = {
  master_id: number;
  title: string;
  cover_image: string;
  year: string;
};

export type DiscogsMasterAlbumType = {
  uri: string;
  images: { uri: string }[];
  genres: string[];
  year: number;
  tracklist: { position: string; title: string; duration: string }[];
  artists: { name: string; resource_url: string; thumbnail_url: string }[];
  title: string;
  videos: { uri: string }[];
  message?: string;
};
