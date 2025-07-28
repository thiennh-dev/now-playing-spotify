export const runtime = 'edge';

import { getNowPlaying } from "@/lib/spotify";
import { NextResponse } from "next/server";

type SpotifyArtist = {
  name: string;
};

type SpotifySong = {
  is_playing: boolean;
  item: {
    name: string;
    artists: SpotifyArtist[];
    album: {
      name: string;
      images: { url: string }[];
    };
    external_urls: { spotify: string };
  };
};

export async function GET() {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return NextResponse.json({ isPlaying: false });
  }

  const song: SpotifySong = await response.json();

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((a) => a.name).join(", ");
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  return NextResponse.json({
    isPlaying,
    title,
    artist,
    album,
    albumImageUrl,
    songUrl,
  });
}
